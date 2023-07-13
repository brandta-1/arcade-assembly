const { Schema, model } = require('mongoose');


const lobbySchema = new Schema(
    {
        game: {
            type: Schema.Types.ObjectId,
            ref: 'Game'
        },

        owner:
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        players: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        limit: {
            type: Number,
            min: 2,
            max: 64
        },
        about: {
            type: String
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
);

lobbySchema
    .virtual('playerCount')
    .get(function () {
        return this.players.length;
    });

const Lobby = model('Lobby', lobbySchema);

module.exports = Lobby;