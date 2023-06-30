const db = require('../config/connection');
const Users = require('../models/users');
const Games = require('../models/games');

const userData = require('./userData.json');
const gameData = require('./gamesData.json')

db.once('open', async () => {
    // delete out anything - might need to add this
    await Users.deleteMany({})
    await Games.deleteMany({})

    // bulk create all of our data
    const users = await Users.insertMany(userData);
    const games = await Games.insertMany(gameData);

    console.log("Users added:", users)
    console.log("Games added:", games)
    console.log('all done');
    process.exit(0)
});