const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");

mongoose.connect(MONGO_URI);

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    username : String,
    password : String
})

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    balance : Number
})


const user = mongoose.model('User', userSchema);
const account = mongoose.model('Account', accountSchema);

module.exports = {user, account};