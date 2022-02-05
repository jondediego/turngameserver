

import { Connection } from "../connection";
import { Logger } from "../logger";
import { TokenTemporal } from "../model/DDBB/TokenTemporal";

export class TokenRepository {
    constructor() {
    }

    public async deleteExpiredTokens(expirationDate: Date):Promise<void> {
        try{
            var res = await Connection.knex.select('*').from<TokenTemporal>('TokenTemporal').whereRaw("firstRequest < ?", [expirationDate]).del();
        }catch(err){
            Logger.logError("Error al obtener lista de tokesn caducados. ", err);
        }
    }

    public async getToken(token: string):Promise<TokenTemporal> {
        try{
            var res = await Connection.knex.select('*').from<TokenTemporal>('TokenTemporal').innerJoin('TMUsers', 'TMUsers.id', 'TokenTemporal.user_fk').where("token", token).first();
            return res;
        }catch(err){
            Logger.logError("Error al obtener token. ", err);
        }
    }

    public async setLastccess(token: string):Promise<void> {
        try{
            var datenow = new Date();
            var res = await Connection.knex('TokenTemporal').update({lastRequest: datenow}).where("token", token);
        }catch(err){
            Logger.logError("Error en setLastccess a TokenRepository. ", err);
        }
    }

    public async createToken(token: string, userId: number):Promise<void> {
        try{
            var datenow = new Date();
            await Connection.knex('TokenTemporal').insert({token: token, firstRequest: datenow, user_fk: userId});
        }catch(err){
            Logger.logError("Error en setLastccess a TokenRepository. ", err);
        }
    }
}