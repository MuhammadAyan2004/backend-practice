const { check, validationResult } = require("express-validator");
const signModel = require("../models/signModel");
const bcrypt = require("bcrypt");

exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'login', 
        activePage: 'login',
        isLoggedIn: req.session.isLoggedIn || false,
        err:{},
        user: {}
    })
}
exports.postLogin = async (req, res) => {
    const {Email,Password} =req.body
    console.log(Email,Password);
    const user = await signModel.findOne({email:Email})
    console.log(user);
    if(!user){
        return res.status(403).render('auth/login',{
            pageTitle: 'login', 
            activePage: 'login',
            isLoggedIn: false,
            err:["invalid email and password please try again"],
            user: {}
        })
    }
    const isMatch = await bcrypt.compare(Password,user.password);
    if(!isMatch){
        return res.status(403).render('auth/login',{
            pageTitle: 'login', 
            activePage: 'login',
            isLoggedIn: false,
            err:["invalid email and password please try again"],
            user: {}
        })
    }


    req.session.isLoggedIn = true
    req.session.user = user
    await req.session.save()
    res.redirect('/')
}

exports.postLogout = (req, res) => {
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
        oldInputs:{FirstName:'',lastName:'',Email:'',password:'',confirmPassword:'',accountType:'',authenticate:''},
        user: {}
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
                oldInputs: req.body,
                user: {}
            })
        }

        bcrypt.hash(password,12)
        .then(hashedPassword =>{
            const User = new signModel({
                firstName:FirstName,
                lastName:lastName,
                email:Email,
                password:hashedPassword,
                accType:accountType
            })
            return User.save()
        })
        .then(()=>{
            res.redirect('/login')
        })
        .catch(err=>{
            return res.status(422).render('auth/signUP',{
                pageTitle: 'sign up',
                activePage: 'sign',
                isLoggedIn: false,
                errors: [err.message],
                oldInputs: req.body,
                user: {}
            })
        })

    }
]