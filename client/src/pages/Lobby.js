import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setImage } from '../utils/helpers';
import { useMutation } from '@apollo/client';
import { JOIN, LEAVE } from '../utils/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/Lobby.css';

export default function Lobby() {

    const [join] = useMutation(JOIN);
    const [leave] = useMutation(LEAVE);

    const location = useLocation();
    const navigate = useNavigate();
    const [lobby, setLobby] = useState(null);

    useEffect(() => {
        if (location.state && location.state.lobby) {
            console.log(location.state.lobby);
            setLobby(location.state.lobby)
        }
    }, [location.state]);

    if (!lobby) {
        return (
            <p>loading</p>
        )
    }

    const joinLobby = async () => {

        try {
            const data = await join({
                variables: {
                    lobbyId: lobby.lobby._id,
                }
            });

            console.log(data);
            console.log(data.data.join);
            if (!data.data.join) {
                console.log("already in")
            }
            else {
                setLobby({
                    game: lobby.game,
                    lobby: data.data.join
                })
            }
        } catch (err) {
            console.error(err);
        }
    };

    const kick = async (username) => {

        try {
            const data = await leave({
                variables: {
                    lobbyId: lobby.lobby._id,
                    username: username
                }
            })

            if (!data.data.leave) {
                console.log("youre not the leader")
            } else {
                console.log(`${username} kicked`)
                setLobby({
                    game: lobby.game,
                    lobby: data.data.leave
                })
            }

        } catch (err) {
            console.error(err);
        }
    };

    console.log(lobby.lobby.players);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            <div className="back-button" onClick={goBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Go Back</span>
            </div>
            
            <img className='lobby-img' src={`${setImage(lobby.game.cover, null, 2)}`} ></img>

            <p className='lobby-owner'>
                {`${lobby.lobby.owner.username}`}'s Lobby
            </p>

            <h3 className='lobby-about'>About</h3>

            <p className='lobby-about-description'>{`${lobby.lobby.about}`}</p>

            <h1 className='lobby-players'>Players</h1>

            <ul className='player-list'>
                {lobby.lobby.players.map((player, i) => {

                    return (
                        <li key={i}>
                            <Link className='profileListLinks' to={`/profile/${player._id}`}>
                                {player.username}
                            </Link>
                            <button className='kick-btn' onClick={() => kick(player.username)}>
                                Kick
                            </button>
                        </li>
                    )
                })}
            </ul>
            {/*onClick has to run something, not just return a value, the expected type is a function*/}
            <button className='join-btn' onClick={joinLobby}>
                Join
            </button>
        </>
    )
}
