const bcrypt = require("bcrypt")
const User = require('../models/User.js');

module.exports = (req,res)=>{
    const {username,password} = req.body;
    User.findOne({username:username}, (error, user)=>{
        if(user){
            bcrypt.compare(password,user.password,(error,valid)=>{
                if (valid){
                    req.session.userId = user._id
                    loggedIn = req.session.userId;
                    res.redirect('/')
                }
                else{
                    res.redirect('/auth/login')
                }
            })
            }    
        else{
            console.log(error)
            res.redirect('/auth/login')
        }        
    })
}