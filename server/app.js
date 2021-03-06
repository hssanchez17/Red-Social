const express = require('express');
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
console.log('Listening at ' + app.get('PORT')))