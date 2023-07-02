import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/pages/Header';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import PlayerSearch from './components/pages/PlayerSearch';
import Signup from './components/pages/Signup'; // <-- Import Signup component
import Footer from './components/pages/Footer';
import { Container } from 'react-bootstrap';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Container fluid className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/player-search" element={<PlayerSearch />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
