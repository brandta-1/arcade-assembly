const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
    {
        cover: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        date: {
            type: Date
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

