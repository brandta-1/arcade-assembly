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
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    gamertag: {
        type: String,
    },
    avatarURL: {
        type: String,
    },

    // Add in a friends list of other users
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ]

    // Add in favorite games


    // Recent games?
})

const Users = model('Users', userSchema);

module.exports = Users;