import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express'

export const userRules = {
    signUpRules: [
        body('userName', 'userName does not exist').exists().withMessage('userName is required'),
        body('password', 'password does not exist').exists().withMessage('password is required'),
        body('role', 'role does not contain (customer, admin)').isIn(['customer', 'admin']).withMessage('role is required')
    ],
    loginRules: [
        body('userName', 'userName does not exist').exists().withMessage('userName is required'),
        body('password', 'password does not exist').exists().withMessage('password is required'),
    ]
}

export const checkValidationResults = (req: Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    } else {
        return res.status(422).send({
            code: 422,
            error: errors.array()
        });
    }
}
