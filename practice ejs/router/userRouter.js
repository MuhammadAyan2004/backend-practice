const express = require('express');
const userRouter = express.Router()

const homeController = require('../controllers/homes')

userRouter.get('/',homeController.getIndex)

userRouter.get('/home.ejs',homeController.gethomeAdd)

userRouter.get('/homeAdded.ejs', homeController.getHomeAdded)

userRouter.get('/homeList.ejs', homeController.getHomeList)

userRouter.get('/favorite.ejs', homeController.getFavoriteList)

userRouter.get('/bookings.ejs', homeController.getBooking)


exports.userRouter = userRouter;