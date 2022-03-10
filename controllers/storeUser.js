const User = require('../models/User.js');

module.exports = async (req,res)=>{
    await User.create(req.body, (error, user)=>{
        if(error){
            const validationError = Object.keys(error.errors).map(key => error.errors[key].message);
            // req.session.validationError = validationError;
            req.flash('validationErrors',validationError)
            req.flash('data',req.body)
            return res.redirect('/auth/register')
            }            
    res.redirect('/')
    })
}