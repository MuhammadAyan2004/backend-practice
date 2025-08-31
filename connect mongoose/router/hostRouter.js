const express = require('express')
const hostRouter = express.Router()

const homeController = require('../controllers/hostController')


hostRouter.get('/host/Addhome',homeController.getAddHome); 
hostRouter.get('/host/homeAdded', homeController.getHomeAdded);
hostRouter.post('/host/homeRegister',homeController.postHome);
hostRouter.get('/host/edit-home/:homeId',homeController.getEditHome);
hostRouter.post('/host/edit-home', homeController.postEditHome);
hostRouter.post('/host/delete/:homeId', homeController.postDeleteHome);


exports.hostRouter = hostRouter;