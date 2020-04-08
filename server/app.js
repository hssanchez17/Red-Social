/*const express = require('express');
const bodyParser = require('body-parser');
const pg=require('pg');
const cors = require('cors');
const path = require ('path');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const morgan = require('morgan')


const publicPath = path.join(__dirname, 'public');

app.use(cors({
   origin:['http://localhost:8080'],
   methods:['GET','POST','PUT','DELETE'],
   credentials: true // enable set cookie
}))


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(publicPath)));
app.use(cookieSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(morgan('dev'));

    
app.set('PORT', process.env.PORT || 5000);

app.use('/',require('./routes'))

const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('PORT'), () => 
console.log('Listening at ' + app.get('PORT')))*/


import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const app = express();
const publicPath = path.join(__dirname, 'public');
// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(publicPath)));
app.use(cookieSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


// Rutas
app.use('/',require('./routes'))

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 5000);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port'+ app.get('puerto'));
});