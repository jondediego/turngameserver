import express = require('express');

export default interface IController{
     path: string;
     router: express.Router;
}