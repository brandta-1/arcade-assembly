import React from 'react';
import Header from './components/pages/Header';
import Home from './components/pages/Home';
import Footer from './components/pages/Footer';
import './styles/App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
    <nav>
      <Header />
      <Home />
      <Footer />
    </nav>
    </Router>
  );
}

export default App;