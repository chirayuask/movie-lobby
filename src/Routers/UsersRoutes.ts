import { Router } from 'express';
import { signupUser, loginUser } from '../Controllers/Users';
import { checkValidationResults, userRules } from '../Middlewares/UserValidator';

const routes = Router();

routes.post('/signup', userRules.signUpRules, checkValidationResults, signupUser);
routes.post('/login', userRules.loginRules, checkValidationResults, loginUser);

export default routes