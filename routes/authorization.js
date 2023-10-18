import express from 'express';
import { login, singup } from '../controllers/authorization.js';
import schemaValidator from '../middlewares/schemaValidator.js';
import { loginPayload, registerPayload } from '../schemas/authorization.js';

const router = express.Router();

router.post('/singup', schemaValidator.verify(registerPayload), singup);
router.post('/login', schemaValidator.verify(loginPayload), login);

export default router;
