const express = require('express');
const validator = require('validator');
const User = require('./mong');
const body = require('body-parser');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Plz filled the data" });
        }
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.json({ message: "User already registered...." });
        }
        if(!validator.isEmail(email)) {
           return res.json({ error: "Plz filled validate email...." });
        }
        if(!validator.isStrongPassword(password)){
           return res.json({ error: "Enter a Strong password which include 1 capital letter...." });
        }
        const user = new User({ email, password });
        const addUser = await User.insertMany([user]);
        res.redirect('/login');
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;