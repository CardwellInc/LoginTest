const express = require('express')
const router = express.Router()
const app = express()
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')


const {createUser, userSignIn} = require('../controllers/controller');


app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


// GET Routes


router.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs')
});

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
});


router.get('/CMWCardwell', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
});




//POST Routes

router.post('/login', checkNotAuthenticated, userSignIn, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}),
(req, res) => {
    console.log(req.user);
});



router.post('/register', checkNotAuthenticated, createUser);




//DELETE Route

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})




const initializePassport = require('../models/user')
initializePassport(
    passport, 
    username => users.find(users => users.username === username),
    id => users.find(users => users.id === id)
)

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

  




module.exports = router