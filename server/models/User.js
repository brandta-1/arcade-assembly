const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const lobbySchema = require('./Lobby');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        firstName: {
            type: String
        },

        lastName: {
            type: String
        },

        avatarURL: {
            type: String
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            select: false,
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

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = model('User', userSchema);

module.exports = User;