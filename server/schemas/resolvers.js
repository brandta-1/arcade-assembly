const Users = require('../models/users')
const Games = require('../models/games')

const resolvers = {

  Query: {

    // DONE - find all users - eventually populate with friends
    users: async () => {
      return Users.find().populate('friends').populate('favoriteGames');
    },

    // find single user
    user: async (parent, { userId }) => {
      return Users.findOne({ _id: userId }).populate('friends').populate('favoriteGames');
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

    // DONE - add a friend to a user
    addFriend: async (parent, { userID, friendID }) => {
      return Users.findOneAndUpdate(
        { _id: userID },
        { $addToSet: { friends: friendID } },
        { new: true, runValidators: true, }
      ).populate('friends')
    },

    // DONE - add a game to a users favorites
    addFavoriteGame: async (parent, { userID, gamesID }) => {
      return Users.findOneAndUpdate(
        { _id: userID },
        { $addToSet: { favoriteGames: gamesID } },
        { new: true, runValidators: true }
      ).populate('favoriteGames');
    }
  }
}

module.exports = resolvers;