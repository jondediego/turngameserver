import express = require('express');
import { TMUsersRepository } from '../../repositories/TMUsersRepository';
import { SGUser } from '../../model/DDBB/SGUser';
import GenericResponse from '../../model/responses/GenericResponse';
import ErrorResponse from '../../model/responses/ErrorResponse';
import crypto from "crypto";
import bcrypt from "bcrypt";
import { UserReponse } from '../../model/responses/UserResponse';
import { TokenRepository } from '../../repositories/TokenRepository';
import IController from '../Icontroller'
import { AllUsersReponse } from '../../model/responses/AllUsersReponse';
import { OneUserResponse } from "../../model/responses/OneUserResponse";
class UsersController implements IController {
    public path = '/api/users';
    public router = express.Router();

    constructor() {
        this._initializeRoutes();
    }

    private _initializeRoutes() {
        this.router.post(this.path, async (req, res) => {
            try {
                var emailUser = await this._getUserByEmail(req.body.email);
                if(emailUser != null){
                    throw new Error("Ya existe un usuario con este email, por favor si ya está registrado, vaya a la página de login y acceda desde allí.");
                }
                await this._saveUser(req);
                let response: GenericResponse = {
                    ok: true
                }
                res.send(response);
            } catch (err) {
                let response: ErrorResponse = {
                    ok: false,
                    errorMessage: err.message
                }
                res.send(response);
            }

        });
        this.router.post(this.path + "/:id", async (req, res) => {
            try {
                if (req.params.id) {
                    await this._saveUser(req);
                    let response: GenericResponse = {
                        ok: true
                    }
                    res.send(response);
                }
            } catch (err) {
                let response: ErrorResponse = {
                    ok: false,
                    errorMessage: err.message
                }
                res.send(response);
            }

        });
        this.router.delete(this.path + "/:id", async (req, res) => {
            try {
                if (req.params.id) {
                    await this._deleteUser(req);
                    let response: GenericResponse = {
                        ok: true
                    }
                    res.send(response);
                }
            } catch (err) {
                let response: ErrorResponse = {
                    ok: false,
                    errorMessage: err.message
                }
                res.send(response);
            }

        });

        this.router.get(this.path, async (req, res) => {
            let user = await this._getUserByEmail(req.query.email);
            let response = null;

            if (user != null && bcrypt.compareSync(req.query.pass, user.pass)) {
                //Creamos un token temporal
                let buffer = await crypto.randomBytes(48);
                const tokenRepo = new TokenRepository();
                var token = buffer.toString('hex');
                await tokenRepo.createToken(token, user.id);

                (<UserReponse>response) = {
                    ok: true,
                    email: user.email,
                    token: token,
                    name: user.name,
                };
            } else {
                (<ErrorResponse>response) = {
                    ok: false,
                    errorMessage: "Login incorrecto"
                }
            }


            res.send(response);
        });
        this.router.get(this.path + "/:id", async (req, res) => {
            try {
                if (req.params.id) {
                    const user = await this._getUserById(req.params.id);
                    let response: OneUserResponse = {
                        ok: true,
                        user: {
                            id: user.id,
                            email: user.email,
                            name: user.name
                        }

                    }
                    res.send(response);
                }
            } catch (err) {
                let response: ErrorResponse = {
                    ok: false,
                    errorMessage: err.message
                }
                res.send(response);
            }
        });
        // this.router.get('/api/usersall', async (req, res) => {
        //     await this._getAllUsers(req, res);
        // });
    }

    private async _saveUser(req: any): Promise<void> {
        var userRepo = new TMUsersRepository();
        if(req.params && req.params.id){
            //Actualización
            var pass = null;
            if(req.body.password != "" && req.body.password != null){
                pass = bcrypt.hashSync(req.body.password, 10);
            }
            var user: SGUser = {
                id:  req.params.id,
                email: req.body.email,
                pass: pass,//No debería modificarse en la actualización
                name: req.body.name,
                createdBy: null,
                createdDate: null,
                updatedBy: req.mySession.user_fk,
                updatedDate: new Date(),
                deletedDate: null,
                deletedBy: null
            }
        }else{
            //Ccreación
            let hashPass = bcrypt.hashSync(req.body.pass, 10);
            var user: SGUser = {
                id:  null,
                email: req.body.email,
                pass: hashPass,
                name: req.body.name,
                createdBy: null,
                createdDate: new Date(),
                updatedBy: null,
                updatedDate: null,
                deletedDate: null,
                deletedBy: null
            }
        }
        
        await userRepo.saveTUMUser(user);
    }

    private async _deleteUser(req: any): Promise<void> {
        var userRepo = new TMUsersRepository();
        var id = req.params.id;
        await userRepo.deleteUser(id, req.mySession.user_fk);
    }

    private async _getUserByEmail(email: string): Promise<SGUser> {
        var userRepo = new TMUsersRepository();
        var user = await userRepo.getUserByEmail(email);
        return user;
    }
    private async _getUserById(id: number): Promise<SGUser> {
        var userRepo = new TMUsersRepository();
        var user = await userRepo.getUserById(id);
        return user;
    }

    /**
     * Devuelve todos los usuarios existentes
     */
    // private async  _getAllUsers(req: express.Request, res: express.Response) {
    //     let users = await this._getUsers();
    //     let response = null;

    //     (<AllUsersReponse>response) = {
    //         ok: true,
    //         users: users.map(el => {
    //             return {
    //                 id: el.id,
    //                 login: el.logname,
    //                 name: el.name,
    //                 surname: el.surname,
    //                 rol: el.rol_fk
    //             }
    //         })
    //     };
    //     res.send(response);
    // }


    // private async _getUsers(): Promise<TMUser[]> {
    //     var userRepo = new TMUsersRepository();
    //     var users = await userRepo.getUsers();
    //     return users;
    // }

}

export default UsersController;