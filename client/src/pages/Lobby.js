import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { setImage } from '../utils/helpers';
import { useMutation } from '@apollo/client';
import { JOIN, LEAVE } from '../utils/mutations';
export default function Lobby() {

    const [join] = useMutation(JOIN);
    const [leave] = useMutation(LEAVE);

    const location = useLocation();
    const [lobby, setLobby] = useState(null);

    useEffect(() => {
        if (location.state && location.state.lobby) {
            console.log(location.state.lobby);
            setLobby(location.state.lobby)
        }
    }, []);

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
            setLobby({
                game: lobby.game,
                lobby: data.data.join
            })
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

    return (
        <>
            <img src={`${setImage(lobby.game.cover, null, 2)}`} ></img>

            <p>
                {`${lobby.lobby.owner.username}`}'s Lobby
            </p>

            <h3>About</h3>

            <p>{`${lobby.lobby.about}`}</p>

            <h1>Players</h1>

            <ul>
                {lobby.lobby.players.map((player, i) => {

                    return (
                        <li key={i}> {player.username} <button onClick={() => kick(player.username)}>
                            kick
                        </button></li>
                    )
                })}
            </ul>
            {/*onClick has to run something, not just return a value, the expected type is a function*/}
            <button onClick={joinLobby}>
                join
            </button>
        </>
    )
}