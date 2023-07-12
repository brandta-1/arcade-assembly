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
        getUser: async (parent, { userId, username }) => {
            let args = { _id: userId };
            if(username) {
                args = {username}
            }
            console.log("ARGS-----------",args)
            const user = await User.findOne(args).populate('friends');
            console.log("User:" ,user);
            // console.log("User Lobbies??", user.lobbies[0].game)
            return user;
        },

        // get all users 
        getUsers: async () => {
            const users = await User.find().populate('friends');
            console.log(users);
            return await User.find().populate('friends');
        },

        //TODO: getUserLobbies and getGameLobbies could be rewritten into one getLobbies query

        getUserLobbies: async (parent, { username }) => {
            //same logic from getGameLobbies query, but for users
            const user = await User.findOne({ username });
            if (user) {
                return await lobbyArray(user);
            }
        },

        getGameLobbies: async (parent, { igdb }) => {
            //check db for game, returns an empty array if the game is not in our db
            const game = await Game.find({ igdb });

            console.log(game[0].lobbies);

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
        //TODO profile pic
        addUser: async (parent, { username, email, password, firstName, lastName, avatarURL }) => {
            const user = await User.create({ username, email, password, firstName, lastName, avatarURL});
            const token = signToken(user);
            return { token, user };
        },

        addFriend: async (parent, {userId, friendId}) => {
            return User.findOneAndUpdate(
                {_id: userId},
                {$addToSet: {friends: friendId}},
                { new: true, runValidators: true, }
                ).populate('friends')
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
        //addGame mutation will return the games _id, this _id will be used in createLobby
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

                return isGame;
            } catch (err) {
                console.log(err);
                return err;
            }
        },

        //createLobby will set the logged-in user as the owner, and update the game/user db

        //below notes apply to any mutation that uses context:
        //for the testing version, add "userId" as an argument and replce the context id,
        // you will also need to add that as an argument in the typeDefs
        createLobby: async (parent, { gameId, limit }, context) => {
            //try to create a lobby with a game and user ID
            //the owner has their Id set, and also added to the list of players
            const theId = context.user._id;
            try {
                const lobby = await Lobby.create({
                    game: gameId,
                    owner: theId,
                    players: [theId],
                    limit: limit
                });

                if (lobby) {
                    const game = await Game.findOneAndUpdate(
                        { _id: gameId },
                        { $push: { lobbies: lobby._id } },
                        { new: true }
                    );

                    const user = await User.findOneAndUpdate(
                        { _id: theId },
                        { $push: { lobbies: lobby._id } },
                        { new: true }
                    );
                }

                const lobbyPop = await Lobby.findById(lobby._id)
                    .populate('game')
                    .populate('owner', 'username')
                    .populate('players', 'username')
                    .populate('limit');

                return lobbyPop;
            } catch (err) {
                console.log(err);
                return err;
            }
        },

        //join will be called whenever the user joins another persons lobby
        //the lobbyId variable will be available bc the lobbies should be rendered using getGameLobbies or getPlayerLobbies
        //see prior notes for context parameter
        //WILL RETURN NULL IF ALREADY JOINED
        join: async (parent, { lobbyId }, context) => {
            //try to find the current lobby, and let a player join

            const userId = context.user._id;

            try {
                let lobby = await Lobby.findOne({ _id: lobbyId })
                    .populate('game', '-lobbies')
                    .populate('owner', 'username')
                    .populate('players', 'username');

                //if the player is already in, return null
                if (lobby.players.filter(i => i._id == userId).length > 0) {
                    console.log("already joined")
                    return null;
                }

                //add the user to the lobby's data
                lobby.players.addToSet({ _id: userId });
                await lobby.save();
                console.log("player joined");

                //add the lobby to the user's data
                const user = await User.findOneAndUpdate(
                    { _id: userId },
                    { $push: { lobbies: lobby._id } },
                    { new: true }
                );

                //misunderstanding of mongoose, but this works
                console.log(lobby.players.pop());
                lobby.players.push({
                    _id: userId,
                    username: user.username
                })

                return lobby;
            } catch (err) {
                console.log(err);
                return err;
            }
        },



        leave: async (parent, { lobbyId, username }, context) => {
            try {

                //get the lobby in question
                const lobby = await Lobby.findById(lobbyId)
                    .populate('game', '-lobbies')
                    .populate('owner', 'username')
                    .populate('players', 'username');

                //if a non-leader is trying to kick another user, return null
                if (context.user.username != username && context.user.username != lobby.owner.username) {
                    return null;
                }

                //remove the lobby from the user
                const user = await User.findOneAndUpdate(
                    { username: username },
                    { $pull: { lobbies: lobbyId } },
                    { new: true }
                );
                    console.log(user);
                //remove the user from the lobby
                
                await lobby.players.pull({_id: user._id});
                await lobby.save();

                console.log(lobby);

                //if the lobby is now empty, delete it, and remove it from the games lobbies
                if (lobby.players.length == 0) {
                    const game = await Game.findOneAndUpdate(
                        { igdb: lobby.game.igdb },
                        { $pull: { lobbies: lobbyId } },
                        { new: true }
                    );

                    lobby.deleteOne({ _id: lobby._id });
                    return lobby;
                }

                //if the lobby-leader left
                if (lobby.owner.username == username) {
                    //the now-oldest member is the new leader
                    lobby.set({ owner: user._id });
                    await lobby.save();
                    return lobby;
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
            .populate('game')
            .populate('owner', 'username')
            .populate('players', 'username')
    ));

    console.log(lobbies);

    return lobbies
}

module.exports = resolvers;