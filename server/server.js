const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
var cors = require('cors')
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

 app.listen(PORT, () => console.log(`App on at ${PORT}`));
/*

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

*/