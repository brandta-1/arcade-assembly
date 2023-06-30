const Users = require('../models/users')
const Games = require('../models/games')

const resolvers = {

  Query: {

    // DONE - find all users - eventually populate with friends
    users: async () => {
      return Users.find().populate('friends');
    },

    // find single user
    user: async (parent, { userID }) => {
      return Users.findOne({ _id: userID })
    },

    // Display all of the games that are listed in our database - which are all the games saved by our users and what is coming from seed file
    games: async () => {
      return Games.find();
    },

  },

  Mutation: {
    // DONE - add a new user
    addUser: async (parent, { criteria }) => {
      const newUser = await Users.create(criteria)
      return newUser;
    },

    // add a friend to a user
    addFriend: async(parent, {userID, friendID}) => {
      return Users.findOneAndUpdate(
        {_id: userID},
        {
          $addToSet: {friends: friendID}
        },
        {
          new: true,
          runValidators: true,
        }
      )
    }
  }
}

module.exports = resolvers;