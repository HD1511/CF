const express = require('express');
const User = require('./mong');
const body = require('body-parser');
const router = express.Router();

router.get('/login',(req,res) => {
    res.render('login');
})

let email,password;

router.post('/login',async (req,res) => {
    try{
        email = req.body.email;
        password = req.body.password;
        if(!email || !password){
            return res.status(400).json({error : "Plz filled the data"});
        }
        const findUser = await User.findOne({email});
        if(findUser){
            if(findUser.password==password){
                res.redirect('/index');
            }
            res.status(402).json({error : "Wrong crendentials."});
        }
    }catch(err){
        console.log(err);
    }
})

router.get('/index',async (req,res) => {
    try{
        if(!email || !password){
            return res.status(400).json({error : "Plz filled the data"});
        }
        const findUser = await User.findOne({email});
        if(findUser){
            if(findUser.password==password){
                console.log(password);
                password="";
                return res.render('index');
            }
            res.status(402).json({error : "Wrong crendentials."});
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = router;