const Users = require('../models/users')

const resolvers = {
    Query: {
        users: async () => {
          return Users.find();
        },
    
      }
}

module.exports = resolvers;