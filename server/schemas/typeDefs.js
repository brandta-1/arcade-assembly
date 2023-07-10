const { gql } = require('apollo-server-express');

const typeDefs = gql`

    scalar Date
    #TODO: profile pic
    type User {
        _id: ID!
        username: String!
        email: String!
        lobbies: [ID]
        firstName: String
        lastName: String
        avatarURL: String
    }

    type Game {
        _id: ID!
        igdb: String!
        cover: String
        name: String!
        lobbies: [Lobby]
        date: Date
    }
    
    type Lobby{
        _id: ID!
        game: Game
        owner: User
        players: [User]
        limit: Int
    }

    type Auth {
        token: ID!
        user: User
    }


    # need to deploy by EOD Sunday, that gives 3 days for deployment debug + bonus feature

    type Query {
        # see resolvers.js for query comments
        me: User
        getUser(username: String): User
        getGameLobbies(igdb: String): [Lobby]
        getUserLobbies(username: String): [Lobby]
    }

    type Mutation {

    #self explanatory
    #TODO profile pic    
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    #add a game to our DB if the user creates a lobby for it
    addGame(igdb: String!, cover: String, name: String!, date: Date): Game

    #given the ID of a lobby, and a user, add and remove them
    createLobby(gameId: ID!, userId: ID, limit: Int!): Lobby
    join(lobbyId: ID!, userId: ID!): Lobby
    leave(lobbyId: ID!, username: String!): Lobby
    promote(lobbyId: ID!, userId: ID!): Lobby
    }
`;

module.exports = typeDefs;