const express = require('express');
const userRouter = express.Router()

const homeController = require('../controllers/homes')

userRouter.get('/',homeController.getIndex)

userRouter.get('/home',homeController.gethomeAdd)

userRouter.get('/homeAdded', homeController.getHomeAdded)

userRouter.get('/homeList', homeController.getHomeList)

userRouter.get('/favorite', homeController.getFavoriteList)

userRouter.get('/bookings', homeController.getBooking)

userRouter.get('/homeList/:homeId',homeController.getHomeDetail)


exports.userRouter = userRouter;