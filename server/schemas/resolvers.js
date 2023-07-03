const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            return await User.findOne({ _id: context.user._id});
        },

        getUser: async(parent, args) => {
            
        }
    }

};

module.exports = resolvers;