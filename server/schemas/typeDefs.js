const { gql } = require('apollo-server-express');

const typeDefs = gql`

    scalar Date

    type User {
        _id: ID!
        username: String!
        email: String!
        lobbies: [ID]
    }

    type Game {
        gameId: String!
        cover: String
        date: Date
    }
    
    type Lobby{
        _id: ID!
        game: [Game]
        owner: User
        players: [User]
    }

    type Auth {
        token: ID!
        user: User
    }


    # need to deploy by EOD Sunday, that gives 3 days for deployment debug + bonus feature

    type Query {
        me: User
        # this will be used forEach user Id inside of a lobby
       #  getUsers(id: ID!): User
        # given a game id or a player-username, retreive the lobbies
        # getLobbies(source: String!): [Lobby]!
    }

    type Mutation {

    #self explanatory    
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    #given the ID of a lobby, and a user, add and remove them
    # join(lobbyId: ID!, userId: ID!): Lobby
    # leave(lobbyId: ID!, userId: ID!): Lobby
    }
`;

module.exports = typeDefs;