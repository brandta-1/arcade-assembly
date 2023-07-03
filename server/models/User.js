const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const gameSchema = require('./Game');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },

        lobbies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Lobby'
            }
        ]
    },

);

const User = model('User', userSchema);

module.exports = User;