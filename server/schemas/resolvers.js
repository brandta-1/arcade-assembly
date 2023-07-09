const { AuthenticationError } = require('apollo-server-express');
const { User, Game, Lobby } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        //get the logged-in user
        me: async (parent, args, context) => {
            return await User.findOne({ _id: context.user._id });
        },

        //get any user that isnt the logged-in user
        //getUser and getUserLobbies will be called whenever you go to a user's profile page
        getUser: async (parent, { username }) => {
            return await User.findOne({ username: username });
        },

        //TODO: getUserLobbies and getGameLobbies could be rewritten into one getLobbies query

        getUserLobbies: async (parent, { username }) => {
            //same logic from getGameLobbies query, but for users
            const user = await User.findOne({ username: username });
            if (user) {
                return await lobbyArray(user);
            }
        },

        getGameLobbies: async (parent, { gameName }) => {
            //check db for game, returns an empty array if the game is not in our db
            const game = await Game.find({ name: gameName });

            //if the game is in our db, retreive its lobbies and return them in an array
            if (game.length) {

                return await lobbyArray(game[0]);
                //the front end should be able to use the virtual 'playerCount'
            }
            //if the game isnt in our db, this query will return null
        },
    },

    Mutation: {

        //addUser will be called when the user signs up, see HW21
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },


        //login will be called when a user logs in, see HW21
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

        //addGame will be called whenever the user clicks on a game-search result,
        //addGame checks if a game is in our DB, and if not, adds it to our DB
        addGame: async (parent, { igdb, cover, name, date }) => {
            try {
                const isGame = await Game.findOne({ igdb })

                if (!isGame) {

                    const game = await Game.create({
                        igdb,
                        cover,
                        name,
                        date
                    });

                    return game;
                }

                return null;
            } catch (err) {
                console.log(err);
                return err;
            }
        },

        //createLobby will set the logged-in user as the owner, and update the game/user db

        //below notes apply to any mutation that uses context:
        //for the testing version, add "userId" as an argument and replce the context id,
        // you will also need to add that as an argument in the typeDefs
        createLobby: async (parent, { gameId }, context) => {
            //try to create a lobby with a game and user ID
            //the owner has their Id set, and also added to the list of players
            try {
                const lobby = await Lobby.create({
                    game: gameId,
                    owner: context.user._id,
                    players: [context.user._id]
                });

                if (lobby) {
                    const game = await Game.findOneAndUpdate(
                        { _id: gameId },
                        { $push: { lobbies: lobby._id } },
                        { new: true }
                    );

                    const user = await User.findOneAndUpdate(
                        { _id: context.user._id },
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

        //join will be called whenever the user joins another persons lobby
        //the lobbyId variable will be available bc the lobbies should be rendered using getGameLobbies or getPlayerLobbies
        //see prior notes for context parameter
        join: async (parent, { lobbyId }, context) => {
            //try to find the current lobby, and let a player join

            try {
                const lobby = await Lobby.findOne({ _id: lobbyId });

                //if the player is already in, return null
                if (lobby.players.includes(context.user._id)) {
                    console.log("already joined")
                    return null;
                }

                //add the user to the lobby's data
                lobby.players.addToSet({ _id: context.user._id });
                await lobby.save();
                console.log("player joined");

                //add the lobby to the user's data
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { lobbies: lobby._id } },
                    { new: true }
                );

                return lobby;
            } catch (err) {
                console.log(err);
                return err;
            }


        },


        //This one doesnt use context, because a leader may want to kick, so it will take id instead
        leave: async (parent, { lobbyId, userId }) => {
            try {

                let lobby = await Lobby.findById(lobbyId);

                //remove the player's ID from the player array
                lobby.players.pull({ _id: userId });
                await lobby.save();

                let user = await User.findById(userId);

                //remove the lobby's ID from the lobby array
                user.lobbies.pull({ _id: lobbyId });
                await user.save();

                //if that player was the owner, a new owner is needed
                if (lobby.owner.toHexString() == userId) {
                    //the now-oldest member is the new leader
                    lobby.set({ owner: lobby.players[0].toHexString() });
                    await lobby.save();
                }
                return lobby;
            } catch (err) {
                console.log(err);
                return err;
            }
        },

        //assign a new leader
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

async function lobbyArray(x) {

    let lobbies = await Promise.all(x.lobbies.map(async i =>

        await Lobby.findById(i.toHexString())
            .populate('game', 'name')
            .populate('owner', 'username')
            .populate('players', 'username')
    ));

    console.log(lobbies);
    return lobbies
}

module.exports = resolvers;