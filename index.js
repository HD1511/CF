const express = require('express');
const hbs = require('hbs');
const login = require('./Router/login');
const register = require('./Router/register');
const body = require('body-parser');

const app = express();
app.use(body.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/partials');

app.use('/static',express.static('public'));
app.use(login);
app.use(register);

app.get('/',(req,res) => {
    res.render('register');
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Hello");
})