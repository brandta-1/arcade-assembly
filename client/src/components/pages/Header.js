import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Header.css';

const Header = () => {
  return (
    <Container fluid className="header-container">
      <Row>
        <Col md={6}>
          <Link to="/">
            <FontAwesomeIcon icon={faGamepad} size="2x" className="logo" />
          </Link>
        </Col>
        <Col md={6} className="text-right">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/player-search" className="nav-link">Player Search</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
