// lib/app.ts
import express = require('express');
import * as cors from "cors";
import UsersController from './routes/api/users';
import bodyParser = require('body-parser');
import { Logger } from './logger';
import {setTokenMiddleware, setPeriodicTokenExpirationManager} from './tokenmanager';

// Create a new express application instance
const app: express.Application = express();



Logger.init();

//Initialize middlewares
app.use(cors.default());

//Initialize controllers
let controllers = [
  new UsersController()//OJO debe estar siempre el primero del array para que funcione el token

];
//Controlamos el token
setTokenMiddleware(app, controllers);
setPeriodicTokenExpirationManager();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

controllers.forEach((controller) => {
  app.use('/', controller.router);
});

//Start app at port
const port = process.env.PORT || 6432;


app.listen(port, function () {
  console.log('taskmanagerserver listening on port 6432!');
});


