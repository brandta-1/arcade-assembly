import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';

const Header = () => {
    const [showLinks, setShowLinks] = useState(false);

    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };

    return (
        <Container fluid className="header-container">
            <Row>
                <Col md={12} className="nav-container">
                    <Link to="/" className="logo-container">
                        <FontAwesomeIcon icon={faGamepad} size="2x" className="logo" />
                    </Link>
                    <div className="menu-container">
                        <FontAwesomeIcon icon={faBars} size="2x" className="menu-icon" onClick={toggleLinks} />
                        <div className={showLinks ? "links-container active" : "links-container"}>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/signup" className="nav-link">Signup</Link>
                            <Link to="/me" className="nav-link">Profile</Link>
                            <Link to="/game-search" className="nav-link">Game Search</Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Header;
