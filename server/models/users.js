const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gamertag: {
        type: String,
    },
    avatarURL: {
        type: String,
    },
})

const Users = model('Users', userSchema);

module.exports = Users;