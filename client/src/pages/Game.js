import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { LobbyArray } from '../components/LobbyArray';
import { LobbyForm } from '../components/LobbyForm';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_GAME_LOBBIES, GET_GAME } from '../utils/queries';

import '../styles/Lobby.css'

const Game = () => {

    const navigate = useNavigate();
    const { gameId } = useParams();

    const { loading: lobbyLoading, data: lobbyData } = useQuery(GET_GAME_LOBBIES, { variables: { igdb: gameId } })

    const { loading: gameLoading, data: gameData } = useQuery(GET_GAME, { variables: { igdb: gameId } })

    const [getLazy, { data: lazy }] = useLazyQuery(GET_GAME_LOBBIES, {
        //this took about 10 hours to figure out...
        fetchPolicy: 'network-only',
    });

    const lobbies = lobbyData?.getGameLobbies || {};

    console.log(lobbies);
    //only say lobbies if addgame has not been called, otherwise you need 
    const [lobbyState, setLobbyState] = useState(lobbies);
    if (lazy) {
        if (lazy.getGameLobbies != lobbyState) {
            setLobbyState(lazy.getGameLobbies);

        }
    }

    useEffect(() => {
        //TODO useeffect
        setLobbyState(lobbies)
    }, [lobbies]);

    const game = gameData?.getGame || {};


    async function addLobby({ data }) {
        console.log("addLobby",data);

       const test = await getLazy({
            variables: { igdb: gameId }
        })
        console.log(test);
        setLobbyState(test.data.getGameLobbies)
    }

    if (gameLoading || lobbyLoading) {
        return <p>Loading...</p>;
    }

    const goBack = () => {
        navigate(-1);
    }

    console.log("LOBBIES VS STATE");
    console.log(lobbies);
    console.log(lobbyState);

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

            <LobbyForm game={game} onSubmit={addLobby} />

            <LobbyArray lobbies={lobbyState} game={game} />

        </Container>
    );
};

//  

export default Game;