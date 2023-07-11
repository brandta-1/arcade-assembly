import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { LobbyArray } from '../components/LobbyArray';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_GAME_LOBBIES } from '../utils/queries';
import {CREATE_LOBBY} from '../utils/mutations';

import '../styles/Lobby.css'

const Game = () => {

    const [game, setGame] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const [createLobby] = useMutation(CREATE_LOBBY);

    const [getGameLobbies, { data : lobbies }] = useLazyQuery(GET_GAME_LOBBIES);

   
    useEffect(() => {
        if (game) {
            getGameLobbies({
                variables: { igdb: game.igdb }
            })
        }
    }, [game])


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

    const create = async () => {
        try {
            const data = await createLobby({
                variables: {
                    
                }
            });
        }catch (err) {
            console.error(err);
        }
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

            <button onClick={create}>create</button>

            <LobbyArray lobbies={lobbies} game={game} />

        </Container>
    );
};

//  

export default Game;