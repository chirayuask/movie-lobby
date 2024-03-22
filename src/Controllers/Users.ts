import { Request, Response } from 'express';
import userModals from '../Models/Users';
import { SecurityService } from '../Helpers/crypto';
export const signupUser = async (req: Request, res: Response) => {
    try {
        let { userName, password, role } = req.body
        let userModels = new userModals(userName, password, role)
        let response = await userModels.createUser();
        return res.status(200).send({ response });
    } catch (error) {
        console.log('error, error', error)
        return res.status(500).send({
            error: error,
            code: 500,
            message: 'Internal Server Error'
        });
    };
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        let { userName, password } = req.body
        let newuser = new userModals(userName, password)

        let loginToken = await newuser.loginUser();
        let ss = new SecurityService(loginToken.message);

        return res.status(200).send({ token: ss.set() });

    } catch (error) {
        console.log('error, error', error)
        return res.status(500).send({
            error: error,
            code: 500,
            message: 'Internal Server Error'
        });
    };
};

