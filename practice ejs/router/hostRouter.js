const express = require('express')
const hostRouter = express.Router()

const homeController = require('../controllers/homes')


hostRouter.get('/Addhome.ejs',homeController.getAddHome); 
hostRouter.post('/homeRegister.ejs',homeController.postHome);

exports.hostRouter = hostRouter;