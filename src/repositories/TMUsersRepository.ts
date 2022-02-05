

import { SGUser } from "../model/DDBB/SGUser";
import { Connection } from "../connection";
import winston from "winston";
import { Logger } from "../logger";

export class TMUsersRepository {
    constructor() {
    }
    
    public async saveTUMUser(user: SGUser):Promise<void> {
        try{
            if(user.id == null){
                await Connection.knex('SGUser').insert({id: user.id, email: user.email, pass: user.pass, name: user.name,  createdBy: user.createdBy, createdDate: new Date()});
            }else {
                if(user.pass != "" && user.pass != null){
                    await Connection.knex('SGUser').update({id: user.id, email: user.email, pass: user.pass, name: user.name, updatedBy: user.updatedBy, updatedDate: new Date()}).where("id", user.id);
                }else{
                    await Connection.knex('SGUser').update({id: user.id, email: user.email, name: user.name, updatedBy: user.updatedBy, updatedDate: new Date()}).where("id", user.id);
                }
            }
        }catch(err){
            Logger.logError("Error al guardar un TMUser. ", err);
        }
    }

    // public async getUsers():Promise<TMUser[]> {
    //     try{
    //         var res = await Connection.knex.select('*').from<TMUser>('TMUsers').whereRaw("deletedDate IS NULL");
    //         return res;
    //     }catch(err){
    //         winston.log("error", "Error al obtener TMUsers. ", {message: err});
    //     }
    // }

    public async getUserByEmail(email: string):Promise<SGUser> {
        try{
            var res = await Connection.knex.select('*').from<SGUser>('SGUser').where("email", email).andWhereRaw("deletedDate IS NULL").first();
            return res;
        }catch(err){
            winston.log("error", "Error al obtener TMUsers. ", {message: err});
        }
    }


    public async getUserById(id: number):Promise<SGUser> {
        try{
            var res = await Connection.knex.select('*').from<SGUser>('TMUsers').where("id", id).first();
            return res;
        }catch(err){
            winston.log("error", "Error al obtener getUserById. ", {message: err});
        }
    }
        
    public async deleteUser(id: number, currentUserId: number):Promise<void> {
        try{
            //var res = await Connection.knex.select('*').from<TMUser>('TMUsers').where("id", id).del();
            var res = await Connection.knex('SGUser').update({deletedDate: new Date(), deletedBy: currentUserId}).where("id", id);
        }catch(err){
            Logger.logError("Error en el borrado de usuario. ", err);
        }
    }
}