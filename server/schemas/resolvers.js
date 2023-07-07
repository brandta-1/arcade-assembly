const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            return await User.findOne({ _id: context.user._id});
        }

    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },


        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const pass = await user.isCorrectPassword(password);

            if (!pass) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        /*
        leave: async (parent, {lobbyId, userId}) => {
            try {
                const lobby = await Lobby.findOneAndUpdate(
                        {_id: lobbyId},
                        { $pull: { players: { _id: userId } } },
                        {new: true}
                );
                if (!lobby) {
                    return res.status(404).json({ message: "Lobby not found" });
                }
                return lobby;
            } catch (err) {
                console.log(err);
                return err;
            }
        }
        */
    }
};

module.exports = resolvers;