import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/pages/Header';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import GameSearch from './components/pages/GameSearch';
import Signup from './components/pages/Signup';
import Footer from './components/pages/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/game-search" element={<GameSearch />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
