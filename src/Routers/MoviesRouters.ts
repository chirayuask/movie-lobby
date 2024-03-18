import { Router } from 'express';
import { MovieRules, validateAdminRequests } from '../Middlewares/MovieValidation';
import { checkValidationResults } from '../Middlewares/UserValidator';
import { createMovie, deleteMovie, findAll, searchMovie, updateMovie } from '../Controllers/Movie';

const routes = Router();

routes.route('/movies/:id')
    .put(MovieRules.updateMovie, checkValidationResults, validateAdminRequests, updateMovie)
    .delete(MovieRules.updateMovie, checkValidationResults, validateAdminRequests, deleteMovie)

routes.route('/movies')
    .post(MovieRules.createMovie, checkValidationResults, validateAdminRequests, createMovie)
    .get(findAll)


routes.get('/search', MovieRules.searchMovie, checkValidationResults, searchMovie);

export default routes