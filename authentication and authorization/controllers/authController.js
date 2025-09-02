const { check, validationResult } = require("express-validator");
const signModel = require("../models/signModel");
// const signModel = require("../models/signUp") 

exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'login', 
        activePage: 'login',
        isLoggedIn: false
    })
}
exports.postLogin = (req, res) => {
    const {Email,Password} =req.body
    // signModel.find({},"email password accType")
        // .then((users)=>{
        //     users.forEach(user=>{
        //         if(user.email === Email && user.password === Password){
        //             console.log(Email,Password);
        //             req.session.isLoggedIn = true
        //             return res.redirect('/')
        //         }else {
        //             return res.render('auth/login',{
        //                 pageTitle:'login',
        //                 activePage:'login',
        //                 isLoggedIn: false
        //             })
        //         }
        //     })
        // })
        // .catch(err=>{
        //     console.log(err);
        // })

    res.redirect('/')
}

exports.postLogout = (req, res) => {
    // res.cookie('isLoggedIn' , false)
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}

exports.getSignIn = (req,res) =>{
    res.render('auth/signUP',{
        pageTitle:'sign in',
        activePage:'sign',
        isLoggedIn:false,
        errors:[],
        oldInputs:{FirstName:'',lastName:'',Email:'',password:'',confirmPassword:'',accountType:'',authenticate:''}
    })
}
exports.postSignIn =[ 
        // First name validation
    check('FirstName')
        .trim()
        .isLength({ min: 2 })
        .withMessage('First name should be at least 2 characters long')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("First name should contain only alphabets"),

    // Last name validation
    check('lastName')
        .trim()
        .isLength({ min: 2 })
        .withMessage("Last name should be at least 2 characters long")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("Last name should contain only alphabets"),

    // Email validation
    check('Email') // fixed typo: was 'Emial'
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),

    // Password validation
    check('password')
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")
        .matches(/[!@#$%^&*()\-_=+{};:,<.>]/)
        .withMessage("Password must contain at least one special character")
        .trim(),

    // Confirm password validation
    check('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    // Account type validation
    check('accountType')
        .notEmpty()
        .withMessage("Account type is required")
        .isIn(['host', 'user'])
        .withMessage('Invalid account type'),


    (req,res) =>{
        console.log(req.body);
        const{FirstName,lastName,Email,password,confirmPassword,accountType,authenticate}=req.body
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(422).render('auth/signUP',{
                pageTitle: 'sign up',
                activePage: 'sign',
                isLoggedIn: false,
                errors: error.mapped(),
                oldInputs: req.body
            })
        }
        const saveSignUp = new signModel({firstName:FirstName,lastName:lastName,email:Email,password:password,accType:accountType})
        saveSignUp.save()
        .then(()=>{
            res.redirect('/login')
        })
        .catch(err=>{
            return res.status(422).render('auth/signUP',{
                pageTitle: 'sign up',
                activePage: 'sign',
                isLoggedIn: false,
                errors: [err.message],
                oldInputs: req.body
            })
        })

    }
]