const express = require('express')
const hostRouter = express.Router()

const homeController = require('../controllers/hostController')


hostRouter.get('/Addhome',homeController.getAddHome); 

hostRouter.get('/homeAdded', homeController.getHomeAdded);

hostRouter.post('/homeRegister',homeController.postHome);

exports.hostRouter = hostRouter;