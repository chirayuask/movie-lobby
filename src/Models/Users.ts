import Users from '../Schema/Users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secretKeys } from '../Config/env';
import { userModalSchema, userValidationPromise } from '../Typings/userModal';

class UserModals {
    private userName: string;
    private password: string;
    private role: string | null;


    constructor(userName: string, password: string, role?: string) {
        this.userName = userName
        this.password = password
        this.role = role || null
    }

    async createUser() {
        try {
            const salt = await bcrypt.genSalt(10);
            let checkIfExists = await Users.findOne({ userName: this.userName });
            if (checkIfExists) return {
                success: false,
                message: 'user already exists'
            };
            let generatehash = await bcrypt.hash(this.password, salt)
            let save = await Users.create({
                userName: this.userName,
                password: generatehash,
                role: this.role
            })
            let token = await this.loginUser();


            return {
                success: true,
                message: 'user created',
                userinfo: save,
                token: token.message
            };
        } catch (error) {
            throw error
        }
    }

    async loginUser() {
        try {
            const user: userModalSchema | null = await Users.findOne({ userName: this.userName });
            if (user) {
                const password_valid = await bcrypt.compare(this.password, user.password);
                if (password_valid) {
                    let token = jwt.sign({ userName: user.userName, role: user.role, password: user.password },
                        secretKeys.JWT_KEY,
                        { expiresIn: secretKeys.JWT_EXPIRES_IN }
                    );
                    return {
                        success: true,
                        message: token
                    }
                } else {
                    return {
                        success: false,
                        message: 'Invalid Password'
                    }
                }
            } else {
                return {
                    success: false,
                    message: 'User does not exists'
                }
            }
        } catch (error) {
            throw error
        }
    }

    async validatePassword() {
        let userInfo: userModalSchema | null = await Users.findOne({ userName: this.userName });
        return userInfo && userInfo.password === this.password ? true : false

    }

}

export class tokenValidation {
    private token: string
    constructor(token: string) {
        this.token = token
    }
    async validateToken() {
        return new Promise<userValidationPromise>(async (resolve, reject) => {
            try {
                if (!this.token) {
                    return resolve({
                        success: false,
                        msg: "Token not provided...!!!",
                        properties: {
                            userName: '', password: '', role: ''
                        }
                    });
                }
                jwt.verify(this.token, secretKeys.JWT_KEY, async (err: any, user: any) => {
                    if (err) {
                        resolve({
                            success: false,
                            msg: "Token Expired, Please re-generate.",
                            properties: {
                                userName: '', password: '', role: ''
                            }
                        });
                    } else {
                        let userProperties: userModalSchema = user as userModalSchema;
                        let userClass = new UserModals(userProperties.userName, userProperties.password, userProperties.role);
                        let login = await userClass.validatePassword();
                        if (login) {
                            resolve({
                                success: true,
                                msg: '',
                                properties: {
                                    userName: userProperties.userName, password: userProperties.password, role: userProperties.role
                                }
                            });
                        } else {
                            resolve({
                                success: false,
                                msg: '',
                                properties: {
                                    userName: '', password: '', role: ''
                                }
                            });
                        }
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
};

export default UserModals;