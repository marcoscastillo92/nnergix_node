import request from 'supertest';
import app from '../index.js';
import db from '../db.js';
import {
	ENDPOINTS,
	PROPERTIES,
	AUTH_HEADER,
	URL_TEST,
	USER_PAYLOAD
} from './data/constants.js';

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('App Endpoints', () => {
	afterAll(async () => {
		await db.sequelize.models.user.destroy({
			where: {
				email: USER_PAYLOAD.email
			}
		});
	});

	describe('when singup', () => {
		it('should create a user if everything ok', async () => {
			// When
			const res = await request(app).post(ENDPOINTS.singup).send(USER_PAYLOAD);

			// Then
			const user = await db.sequelize.models.user.findOne({
				where: { email: USER_PAYLOAD.email }
			});

			expect(res.statusCode).toEqual(201);
			expect(res.body).toHaveProperty(PROPERTIES.token);
			expect(res.body?.token).toBeTruthy();
			expect(user).toBeTruthy();
		});

		it('should return error if email already exists', async () => {
			// When
			const res = await request(app).post(ENDPOINTS.singup).send(USER_PAYLOAD);

			// Then
			expect(res.statusCode).toEqual(500);
			expect(res.body).toHaveProperty(PROPERTIES.error);
		});

		it('should return error if some field is missing', async () => {
			// Given
			const payload = { ...USER_PAYLOAD };
			delete payload.email;

			// When
			const res = await request(app).post(ENDPOINTS.singup).send(payload);

			// Then
			expect(res.statusCode).toEqual(400);
			expect(res.body).toHaveProperty(PROPERTIES.error);
		});
	});

	describe('when authorization header is wrong', () => {
		it('should return no authorized if not present', async () => {
			// When
			const res = await request(app).post(ENDPOINTS.links).send({
				url: URL_TEST
			});

			// Then
			expect(res.statusCode).toEqual(401);
			expect(res.body).toHaveProperty(PROPERTIES.error);
			expect(res.body.error).toEqual('No auth header found in request.');
		});

		it('should return no authorized if not bearer token', async () => {
			// When
			const res = await request(app)
				.post(ENDPOINTS.links)
				.set(AUTH_HEADER, 'wrong')
				.send({
					url: URL_TEST
				});

			// Then
			expect(res.statusCode).toEqual(401);
			expect(res.body).toHaveProperty(PROPERTIES.error);
			expect(res.body.error).toEqual('No bearer token provided.');
		});

		it('should return no authorized if missing bearer token', async () => {
			// When
			const res = await request(app)
				.post(ENDPOINTS.links)
				.set(AUTH_HEADER, 'Bearer')
				.send({
					url: URL_TEST
				});

			// Then
			expect(res.statusCode).toEqual(401);
			expect(res.body).toHaveProperty(PROPERTIES.error);
			expect(res.body.error).toEqual('Token is missing.');
		});

		it('should return no authorized if invalid bearer token', async () => {
			// When
			const res = await request(app)
				.post(ENDPOINTS.links)
				.set(AUTH_HEADER, 'Bearer pihwpij29fjn3rwg03rhg3')
				.send({
					url: URL_TEST
				});

			// Then
			expect(res.statusCode).toEqual(401);
			expect(res.body).toHaveProperty(PROPERTIES.error);
			expect(res.body.error).toEqual('Invalid access token.');
		});
	});

	describe('when login', () => {
		it('should return 200 if everything ok', async () => {
			// When
			const res = await request(app).post(ENDPOINTS.login).send({
				email: USER_PAYLOAD.email,
				password: USER_PAYLOAD.password
			});

			// Then
			expect(res.statusCode).toEqual(200);
			expect(res.body).toHaveProperty(PROPERTIES.token);
			expect(res.body?.token).toBeTruthy();
		});

		it('should return 401 if user not found', async () => {
			// Given
			const email = 'wrong';

			// When
			const res = await request(app).post(ENDPOINTS.login).send({
				email: email,
				password: USER_PAYLOAD.password
			});

			// Then
			expect(res.statusCode).toEqual(401);
			expect(res.body).toHaveProperty(PROPERTIES.error);
			expect(res.body.error).toEqual(`User \`${email}\` not found.`);
		});

		it('should return 401 if user password wrong', async () => {
			// When
			const res = await request(app).post(ENDPOINTS.login).send({
				email: USER_PAYLOAD.email,
				password: 'wrong'
			});

			// Then
			expect(res.statusCode).toEqual(401);
			expect(res.body).toHaveProperty(PROPERTIES.error);
			expect(res.body.error).toEqual(
				`User \`${USER_PAYLOAD.email}\` not found.`
			);
		});
	});

	describe('when authorization header is ok', () => {
		beforeEach(async () => {
			await db.sequelize.models.link.destroy({
				where: {
					url: URL_TEST
				}
			});
		});

		it('should return 200 if everything ok and create a link', async () => {
			// Given
			const loginRes = await request(app).post(ENDPOINTS.login).send({
				email: USER_PAYLOAD.email,
				password: USER_PAYLOAD.password
			});

			// When
			const res = await request(app)
				.post(ENDPOINTS.links)
				.set(AUTH_HEADER, `Bearer ${loginRes.body.token}`)
				.send({
					url: URL_TEST
				});

			await sleep(100);
			const link = await db.sequelize.models.link.findOne({
				where: {
					url: URL_TEST
				}
			});

			// Then
			expect(res.statusCode).toEqual(200);
			expect(link).toBeTruthy();
		});

		it('should return 400 if url is missing', async () => {
			// Given
			const loginRes = await request(app).post(ENDPOINTS.login).send({
				email: USER_PAYLOAD.email,
				password: USER_PAYLOAD.password
			});

			// When
			const res = await request(app)
				.post(ENDPOINTS.links)
				.set(AUTH_HEADER, `Bearer ${loginRes.body.token}`)
				.send({});

			// Then
			expect(res.statusCode).toEqual(400);
			expect(res.body).toHaveProperty(PROPERTIES.error);
			expect(res.body.error).toEqual(
				"Invalid payload: data must have required property 'url'"
			);
		});
	});

	describe('when consulting anonymously', () => {
		it('should return 200 if everything ok', async () => {
			// When
			const res = await request(app).post(ENDPOINTS.linksAnon).send({
				url: URL_TEST
			});

			// Then
			expect(res.statusCode).toEqual(200);
		});
	});
});
