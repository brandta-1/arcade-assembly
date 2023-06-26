const db = require('../config/connection');
const Users = require('../models/users')
const userData = require('./userData.json')

db.once('open', async () => {
    // delete out anything - might need to add this
    await Users.deleteMany({})

    // bulk create all of our data
    const users = await Users.insertMany(userData);

    console.log("Users added:", users)
    console.log('all done');
    process.exit(0)

})