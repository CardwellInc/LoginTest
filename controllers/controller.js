
const User = require('../models/user');



function isLoggedIn (req, res, next){
    if (req.isAuthenticated())
    return next();
    res.redirect('/');
}


// functions
exports.isLoggedIn = (req, res, next)=>{
    if (req.isAuthenticated())  // <-- typo here
        return next();
    res.redirect('/');
}

exports.isNotLoggedIn = (req, res, next)=>{
    if (req.isAuthenticated()) { // <-- typo here
        return res.redirect('index');
}
next()
}


exports.createUser = async (req, res) => {
    const { name, username, password } = req.body;
const isNewUser = await User.isThisUsernameInUse(username);
if (!isNewUser) 
return res.json({
    success: false, 
    message: 'This Username is already in use, Please Check MongoDB',
});
    const user = await User({
        name, 
        username, 
        password,
    });
    await user.save();
    res.json(user);
};

exports.userSignIn = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username})

    if(!user) 
    return res.json({
        success: false, 
        message: 'No Users Found',
    }), console.log('un error');

const isMatch = await user.comparePassword(password)
if(!isMatch) 
return res.json({
    success: false, 
    message: 'Does Not Match'
}), console.log('pw error');
console.log(user)
res.redirect
};



