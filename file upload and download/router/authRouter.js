const express = require('express')
const authRouter = express.Router()

const authController = require('../controllers/authController')


authRouter.get('/login',authController.getLogin); 
authRouter.post('/login',authController.postLogin); 
authRouter.post('/logout',authController.postLogout); 
authRouter.get('/signUp',authController.getSignIn); 
authRouter.post('/signIn',authController.postSignIn); 


exports.authRouter = authRouter;