import { Router } from 'express';
import { MovieRules, validateAdminRequests } from '../Middlewares/MovieValidation';
import { checkValidationResults } from '../Middlewares/UserValidator';
import { createMovie } from '../Controllers/Movie';

const routes = Router();


routes.post('/create-movie', MovieRules.createMovie, checkValidationResults, validateAdminRequests, createMovie)
routes.get('/search')

export default routes