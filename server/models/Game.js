const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
    {
        igdb: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        date: {
            type: Number
        },
        lobbies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Lobby'
            }
        ]
    }
);

const Game = model('Game', gameSchema);

module.exports = Game;

