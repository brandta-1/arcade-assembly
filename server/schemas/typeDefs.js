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
        players: [User]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        # this will be used forEach user Id inside of a lobby
        getUser(id: ID!): User
        # given a game id or a player-username, retreive the lobbies
        getLobbies(source: String!): [Lobby]
    }

    type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    joinLobby(_id: ID!): Lobby
    leaveLobby(_id: ID!): Lobby
    }
`;

module.exports = typeDefs;