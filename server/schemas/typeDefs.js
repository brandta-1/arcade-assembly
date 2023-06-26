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
    }

    type Query {
        users: [Users]
    }
`;

module.exports = typeDefs