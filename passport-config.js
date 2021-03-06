const { authenticate } = require('passport')

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username)
        if (user == null) {
            return done(null, false, { message: 'No User with that Username'})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                    return done(null, user)
            } else {
                    return done(null, false, { message: 'Password Incorrect'})
            }
        } catch(e) {
            return done(e)
        }
    }
    
    passport.use(UserDetails.createStrategy());
    passport.serializeUser(UserDetails.serializeUser());
    passport.deserializeUser(UserDetails.deserializeUser());

    passport.use(new LocalStrategy({ usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => { 
        return done(null, getUserById(id))
    })
}



