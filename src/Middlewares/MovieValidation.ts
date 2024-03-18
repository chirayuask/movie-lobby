import { body, header } from 'express-validator'
import { Response, NextFunction } from 'express'
import { ExtendedExpressRequest } from '../Typings/movieModals'
import { tokenValidation } from '../Models/Users'
export const MovieRules = {
    createMovie: [
        body('title').notEmpty({ ignore_whitespace: true }).withMessage('title is required'),
        body('genre').notEmpty({ ignore_whitespace: true }).withMessage('genre is required'),
        body('rating').notEmpty({ ignore_whitespace: true }).withMessage('rating is required'),
        body('streamingLink').notEmpty({ ignore_whitespace: true }).withMessage('streamingLink is required'),
        header('authorization').notEmpty({ ignore_whitespace: true }).withMessage('token is required')
    ]
};

export const validateAdminRequests = async (req: ExtendedExpressRequest, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization) {
            let newuserclass = new tokenValidation(req.headers.authorization)
            let validateToken = await newuserclass.validateToken();
            if (validateToken.success && validateToken.properties && validateToken.properties.role === 'admin') {
                req.users = validateToken.properties
                return next();
            } else {
                return res.status(400).send({
                    success: false,
                    message: 'User is not Valid',
                    code: 400
                })
            }
        } else {
            return res.status(400).send({
                success: false,
                message: 'Validation Error',
                code: 400
            })
        }

    } catch (error) {
        console.log('error', error);
        return res.status(400).send({
            success: false,
            message: 'Validation Error',
            code: 400
        });
    };
};