import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/pages/Header';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import GameSearch from './components/pages/GameSearch';
import Lobby from './components/pages/Lobby'
import Signup from './components/pages/Signup';
import Footer from './components/pages/Footer';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('id_token')
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div className="app-container">
        <Header />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/game-search" element={<GameSearch />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/lobby/:gameId" element={<Lobby />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
