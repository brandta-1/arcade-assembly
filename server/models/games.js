const {Schema, model} = require('mongoose')

// Creating a games schema which will store games that the user will be able to save to their profile in favorites, or automatically saved as their recent games
const gameSchema = new Schema ({

    // ID coming from the IGDG Database if we need it
    gameId: {
        type: String
    },
    
    name: {
        type: String
    },

    release_dates: [String],

    summary: {
        type: String
    },

    url: {
        type: String
    },

    cover: {
        type: String
    },

    // array of saved games
    

})

const Games = model('Games', gameSchema);
module.exports = Games;