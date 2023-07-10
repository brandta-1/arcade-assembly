import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Lobby.css'

const Lobby = () => {
    const [game, setGame] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Get game data from the state
        if (location.state && location.state.game) {
            setGame(location.state.game);
        }
    }, [location.state]);

    if (!game) {
        return <p>Loading...</p>; 
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-start">
                <Col md={12}>
                    <div className="back-button" onClick={goBack}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Go Back</span>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md={12} className="text-center">
                    <Image src={game.cover} alt={game.name} fluid rounded className="game-image" />
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-3">
                <Col md={12} className="text-center">
                    <h2 className="game-name">{game.name}</h2>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-3">
                <Col md={12} className="text-center">
                    <p className="game-release-date">Release Date: {new Date(game.date * 1000).toLocaleDateString()}</p>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-3">
                <Col md={12} className="text-center">
                    <p className="game-note">Please note older released games may have less active players.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default Lobby;