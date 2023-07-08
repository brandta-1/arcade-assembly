const { AuthenticationError } = require('apollo-server-express');
const { User, Game, Lobby } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            return await User.findOne({ _id: context.user._id });
        },

        getGameLobbies: async (parent, {gameTitle}) => {
                //check db for game, returns an empty array of the game is not in our db
                const game = await Game.find({ title: gameTitle });
             
                //if the game is in our db, retreive its lobbies and return them in an array
                if (game.length) {
                    let lobbies = await Promise.all(game[0].lobbies.map(async i =>

                        //TODO include fields, so this can return the owners username, and playercount

                        await Lobby.findById(i.toHexString())
                    ));
                    console.log(lobbies);
                    return lobbies
                }
                //if the game isnt in our db, this query will return null
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

        addGame: async (parent, { cover, title, date }) => {
            try {
                const game = await Game.create({
                    cover,
                    title,
                    date
                });

                return game;
            } catch (err) {
                console.log(err);
                return err;
            }
        },

        createLobby: async (parent, { ownerId, gameId }) => {
            //try to create a lobby with a game and user ID
            //the owner has their Id set, and also added to the list of players
            try {
                const lobby = await Lobby.create({
                    game: gameId,
                    owner: ownerId,
                    players: [ownerId]
                });

                if (lobby) {
                    const game = await Game.findOneAndUpdate(
                        { _id: gameId },
                        { $push: { lobbies: lobby._id } },
                        { new: true }
                    );

                    const user = await User.findOneAndUpdate(
                        { _id: ownerId },
                        { $push: { lobbies: lobby._id } },
                        { new: true }
                    );
                }

                return lobby;
            } catch (err) {
                console.log(err);
                return err;
            }
        },

        join: async (parent, { lobbyId, userId }) => {
            //try to find the current lobby, and let a player join
            try {
                const lobby = await Lobby.findOneAndUpdate(
                    { _id: lobbyId },
                    { $addToSet: { players: { _id: userId } } },
                    { new: true }
                );

                if (lobby) {
                    User.findOneAndUpdate(
                        { _id: userId },
                        { $push: { lobbies: lobby._id } },
                        { new: true }
                    );
                }

                return lobby;
            } catch (err) {
                console.log(err);
                return err;
            }
        },

        leave: async (parent, { lobbyId, userId }) => {
            try {

                let lobby = await Lobby.findById(lobbyId);

                //remove the player's ID from the player array
                lobby.players.pull({ _id: userId });
                lobby.save();

                let user = await User.findById(userId);

                //remove the lobby's ID from the lobby array
                user.lobbies.pull({ _id: lobbyId });
                user.save();

                //if that player was the owner, a new owner is needed
                if (lobby.owner.toHexString() == userId) {

                    const lobby2 = await Lobby.findOneAndUpdate(
                        { _id: lobbyId },
                        { owner: lobby.players[0].toHexString() },
                        { new: true }
                    );

                    console.log(lobby2);
                }
                return lobby;
            } catch (err) {
                console.log(err);
                return err;
            }
        },

        promote: async (parent, { lobbyId, userId }) => {
            console.log(userId);
            try {
                const lobby = await Lobby.findOneAndUpdate(
                    { _id: lobbyId },
                    { owner: userId },
                    { new: true }
                );

                return lobby;
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    }
};

module.exports = resolvers;