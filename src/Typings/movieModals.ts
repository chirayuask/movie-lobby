import { Request } from 'express';
import { userModalSchema } from './userModal';

export interface movieSchema {
    title: string,
    genre: string,
    rating: string,
    streamingLink: string,
}
export interface ExtendedExpressRequest extends Request {
    headers: {
        [key: string]: string | string[] | undefined;
        authorization?: string;
    }
    users?: userModalSchema
}

