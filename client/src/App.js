import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import GameSearch from './pages/GameSearch';
import Game from './pages/Game';
import Lobby from './pages/Lobby';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import ProfileList from './pages/ProfileList'
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
            <Route path="/game/:gameId" element={<Game />} />
<<<<<<< HEAD
            <Route path="/profilesList" element={<ProfileList />} />
=======
            <Route path = "/lobby/:lobbyId" element={<Lobby />} />
>>>>>>> 2593a65948359d37177e0131301535c9865ca6eb
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
