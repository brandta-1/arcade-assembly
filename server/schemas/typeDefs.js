const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Users {
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        gamertag: String
        avatarURL: String
        friends: [Users]
    }

    type Games {
        id: ID
        gameId: String
        name: String
        release_Dates: [String]
        summary: String
        url: String
        cover: String
    }

    input SaveUserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        gamertag: String
        avatarURL: String
    }

    type Query {
        users: [Users]
        user(userID: ID!): Users
        games: [Games]
    }

    type Mutation {

    # add a new user
    addUser(criteria: SaveUserInput): Users

    # add to friends list
    addFriend(userID: ID!, friendID: ID!): Users

    # user adds a game to their favorites
    # addFavoriteGame(userID: _id, gameId: _id): Users

    # login the user

    }
`;

module.exports = typeDefs