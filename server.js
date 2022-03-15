if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
require('./models/db');
require('./controllers/controller');



const Users = require('./models/user')
const route = require('./routes/router')

app.set('view-engine', 'ejs')

app.use(route)

// Set up session
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())



// Set up Passport
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

passport.use(Users.createStrategy());
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.listen(3000, () => {
  console.log('Listening on Port 3000')
});
