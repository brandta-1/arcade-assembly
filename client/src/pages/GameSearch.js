import React, { useState, useEffect } from 'react';
import { searchGames } from '../utils/API';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styles/GameSearch.css';

import { useMutation } from '@apollo/client';
import { ADD_GAME } from '../utils/mutations'



const GameSearch = () => {
    const [addGame, { error }] = useMutation(ADD_GAME);



    const [searchTerm, setSearchTerm] = useState('');
    const [games, setGames] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (searchTerm.length > 1) {
            fetchGames(searchTerm);
        } else {
            setGames([]);
            setMessage('');
        }
    }, [searchTerm]);

    const fetchGames = async (searchTerm) => {
        const gameData = await searchGames(searchTerm);
        console.log(gameData);
        if (Array.isArray(gameData)) {
            setGames(gameData);
            setMessage('');
        } else {
            console.error('Error: Expected an array but received', gameData);
            setGames([]);
        }
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTabClick = async (index) => {
        setActiveTab(index + 1);
        // Navigate to the lobby with game data

        try {
            const data = await addGame({ variables: games[index] });
            console.log(data.data.addGame._id);

            navigate(
                `/game/${games[index].igdb}`, {
                state: {
                    game: { ...games[index], _id: data.data.addGame._id }
                }
            });
        } catch (err) {
            console.error(err);
        }
    };
   

    return (
        <Container className="app-header-search">
            <Row className="justify-content-md-center">
                <Col md={12}>
                    <h1 className="game-search-title">Search a Game</h1>
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Find Game"
                            value={searchTerm}
                            onChange={handleInputChange}
                            className="search-input search-input-shifted"
                        />
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        </div>
                    </div>

                    {message && <p>{message}</p>}

                    <ListGroup className="search-list">
                        {games.map((game, index) => (
                            <ListGroup.Item
                                key={index}
                                className={`search-list-item ${activeTab === index + 1 ? 'active-tab' : ''}`}
                                onClick={() => handleTabClick(index)}
                            >
                                <img src={game.cover} alt={game.name} />
                                <p>{game.name}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default GameSearch;
