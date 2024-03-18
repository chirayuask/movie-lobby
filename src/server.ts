import express from 'express';
import { secretKeys } from './Config/env'
import compression from 'compression'
import { secureRequest } from './Middlewares/secureRequest';
import moviesRoutes from './Routers/MoviesRouters'
import userRoutes from './Routers/UsersRoutes';

export class Server {
    public app: express.Application = express();
    public SERVER_PORT = secretKeys.SERVER_PORT as number

    constructor() {
        this.handleMiddlewares();
        this.setRoutes();
        
    }

    private handleMiddlewares() {
        // For Body parser
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        // For Compression
        this.app.use(compression({
            filter: (req, res) => {
                if (req.headers['x-no-compression']) return false

                return compression.filter(req, res);
            }
        }))
        this.app.use(secureRequest)
    }

    private setRoutes() {
        this.app.use('/api/v1', moviesRoutes)
        this.app.use('/api/v1', userRoutes)
    }

}
