const { Schema, model } = require('mongoose');


const lobbySchema = new Schema(
    {
        game: {
            type: Schema.Types.ObjectId,
            ref: 'Game'
        },

        players: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
);

const Lobby = model('Lobby', lobbySchema);

module.exports = Lobby;