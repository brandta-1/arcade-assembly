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

    const handleTabClick = (index) => {
        setActiveTab(index + 1);
        // Navigate to the lobby with game data
        navigate(
            `/game/${games[index].id}`, { state: { game: games[index] } });
    };

    const handleSearchClick = async () => {
        if (!searchTerm) {
            setMessage('Please enter a search term');
            return;
        }

        const gameData = await searchGames(searchTerm);
        console.log(gameData)
        if (!gameData || !Array.isArray(gameData) || gameData.length === 0) {
            setMessage('No results found');
            setGames([]);
            return;
        }

        //add the game to our database
        try {
            addGame({ variables: gameData });
        } catch (err) {
            console.error(err);
        }

       


        setGames(gameData);
        setMessage('');
        navigate(`/game/${gameData[0].name}`,
            {
                state: { game: gameData[0] }
            });
    };

    return (
        <Container className="app-header-search">
            <Row className="justify-content-md-center">
                <Col md={12}>
                    <h1 className="game-search-title">Search a Game</h1>
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="Search for a game..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            className="search-input search-input-shifted"
                        />
                        <div className="icon-container" onClick={handleSearchClick}>
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
