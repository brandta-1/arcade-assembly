import React, { useState, useEffect } from 'react';
import { searchGames } from '../../utils/API';
import '../../styles/GameSearch.css';

const GameSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [games, setGames] = useState([]);
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        if (searchTerm.length > 1) {
            fetchGames(searchTerm);
        } else {
            setGames([]);
        }
    }, [searchTerm]);

    const fetchGames = async (searchTerm) => {
        const gameData = await searchGames(searchTerm);
        setGames(gameData);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTabClick = (index) => {
        setActiveTab(index + 1);
    };

    return (
        <div>
            <h1>Game Search Page</h1>
            <input
                type="text"
                placeholder="Search for a game..."
                value={searchTerm}
                onChange={handleInputChange}
                className="game-search-input"
            />

            <div className="game-tabs">
                {games.map((game, index) => (
                    <div
                        key={index}
                        className={`game-tab-head ${activeTab === index + 1 ? 'active-tab' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        <p>{game.name}</p>
                    </div>
                ))}
            </div>

            <div className="game-tab-bodies">
                {games.map((game, index) => (
                    <div
                        key={index}
                        className={`game-tab-body ${activeTab === index + 1 ? 'show-tab' : ''}`}
                    >
                        <img src={game.cover} alt={game.name} />
                        <p>ID: {game.id}</p>
                        <p>Name: {game.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameSearch;
