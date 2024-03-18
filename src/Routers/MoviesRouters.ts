import { Router } from 'express';
import { MovieRules, validateAdminRequests } from '../Middlewares/MovieValidation';
import { checkValidationResults } from '../Middlewares/UserValidator';
import { createMovie, deleteMovie, findAll, searchMovie, updateMovie } from '../Controllers/Movie';

const routes = Router();


routes.post('/movies', MovieRules.createMovie, checkValidationResults, validateAdminRequests, createMovie);
routes.get('/search', MovieRules.searchMovie, checkValidationResults,  searchMovie);
routes.get('/movies', findAll);
routes.put('/movies/:id', MovieRules.updateMovie, checkValidationResults, validateAdminRequests, updateMovie);
routes.delete('/movies/:id', MovieRules.updateMovie, checkValidationResults, validateAdminRequests, deleteMovie)

export default routes