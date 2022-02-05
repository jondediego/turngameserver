
import { TokenRepository } from './repositories/TokenRepository';
import UsersController from './routes/api/users';
import ErrorResponse from './model/responses/ErrorResponse';
import express = require('express');
import { RSA_NO_PADDING } from 'constants';

const tokenDurationInMinutes: number = 200;
const tokenMaxWaitInMinutes: number = 60;
const checkExpiredTokensIntervalInMinutes: number = 1;


export function setTokenMiddleware(app: express.Application, controllers: any[]) {
    app.use('/', async function (req, res, next) {
        const tokenRepo = new TokenRepository();

        if ((req.path == (<UsersController>controllers[0]).path && req.method == "GET") ||
            (req.path == (<UsersController>controllers[0]).path && req.method == "POST")) {
            //Si el logueo es correto, se devolverá un Token
            next();
        } else {
            let token = <string>req.headers.authent;
            const tokenInDDBB = await tokenRepo.getToken(token);
            const now = new Date();
            if (tokenInDDBB != null &&
                (tokenInDDBB.lastRequest == null || (now.getTime() - tokenInDDBB.lastRequest.getTime()) < (tokenMaxWaitInMinutes * 60 * 1000)) &&
                (now.getTime() - tokenInDDBB.firstRequest.getTime()) < (tokenDurationInMinutes * 60 * 1000)) {

            //Token OK, continuamos
                await tokenRepo.setLastccess(token);
                (<any>req).mySession = tokenInDDBB;
                next();
            } else {
                let response: ErrorResponse = {
                    ok: false,
                    errorMessage: "Login incorrecto"
                }
                res.status(401);
                res.send(response);
            }
        }
    });
}


export function setPeriodicTokenExpirationManager() {
    // función para borrar tokens de gente que lleva demasiado tiempo logueada
    setInterval(async () => {
        const tokenRepository = new TokenRepository();
        const now = new Date().getTime();
        const expirationDate = new Date(now-(tokenDurationInMinutes*60*1000));
        await tokenRepository.deleteExpiredTokens(expirationDate);
    }, checkExpiredTokensIntervalInMinutes * 60 * 1000)
}