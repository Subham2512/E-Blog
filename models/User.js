const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new Schema({
username:  {
    type: String,
    required: [true,'Please enter username'],
    unique: [true,'enter unique username']
    },
password: {
    type: String,
    required: [true,'Please enter password'],
    }    
});
UserSchema.plugin(uniqueValidator)

UserSchema.pre('save',function(next){
    const user = this;
    bcrypt.hash(user.password,10,(error,hash)=>{
        user.password = hash;
        next()
    })
})
// export model
const User = mongoose.model('User',UserSchema);
module.exports = User