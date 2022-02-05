import  knex from 'knex';
import { Config } from 'knex';
export class Connection{
    public test: any;
    static knex: knex = knex(Connection._exportConfig());

 
    private static _exportConfig(): Config {
        //const environment = process.env.NODE_ENV || 'development';
        const environment =  'development';

        return require('../knexfile')[environment];
    }

}
