const express = require('express')
const hostRouter = express.Router()

const homeController = require('../controllers/homes')


hostRouter.get('/Addhome',homeController.getAddHome); 
hostRouter.post('/homeRegister',homeController.postHome);

exports.hostRouter = hostRouter;