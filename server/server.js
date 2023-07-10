const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

const herokuliveURL = null;
const HOST = herokuliveURL || 'https://localhost:3000';

const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware });

app.use(
    express.urlencoded({ extended: true }),
    express.json(),
    //here is a list of cross origins that are valid, its valid to enable CORS, its just us
    //wait until after deployment to mess with CORS, also look into HELMET for express
    cors({
         origin: [
             HOST,
             'https://studio.apollographql.com'
         ]
    }),
    routes
);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

//  app.get('/*', (req, res) => {
//      res.sendFile(path.join(__dirname, '../client/build/index.html'));
//  });

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`🌍 Now listening on localhost:${PORT}`)
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });

};

startApolloServer(typeDefs, resolvers);
