import winston = require('winston');
export class Logger{

    public static init(){
        let files = new winston.transports.File({ filename: 'logfile.log' });
        let myconsole = new winston.transports.Console();
        winston.add(myconsole);
        winston.add(files);
    }

    public static logError(text: string, err: any): void {
        //const environment = process.env.NODE_ENV || 'development';
        if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV != 'development'){
            winston.log("error", text, {message: err});
            console.log(text+ " Err:"+ err);
        }

    }

}
