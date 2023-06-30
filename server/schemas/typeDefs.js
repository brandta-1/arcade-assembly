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
        favoriteGames: [Games]
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
        user(userId: ID!): Users
        games: [Games]
    }

    type Mutation {

    # add a new user
    addUser(criteria: SaveUserInput): Users

    # add to friends list
    addFriend(userID: ID!, friendID: ID!): Users

    # user adds a game to their favorites
    addFavoriteGame(userID: ID!, gamesID: ID): Users

    # login the user

    }
`;

module.exports = typeDefs