import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Lobby.css';

export function LobbyArray(props) {

    const navigate = useNavigate();

    console.log("PROPS", props);

    const lobbies = props?.lobbies?.getUserLobbies || props?.lobbies
    console.log("LOBBIES", lobbies)


    let game = props?.game;

    const handleClick = (lobby, index) => {

        if (game == "profile") {
            game = lobby.game
        }

        const lobbyProps = {
            game: game,
            lobby: lobbies[index]
        }

        navigate(`/lobby/${lobby._id}`,
            {
                state: { lobby: lobbyProps }
            });

    };

    if (!lobbies || lobbies == {} || lobbies[0] == undefined) {
        console.log(lobbies);
        return (
            <p>loading...</p>
        )
    }

    return (

        <ul className='text-center lobby-list'>
            {lobbies.length === 0 && "No Lobbies Yet"}
            {lobbies.map((lobby, i) => {

                if (lobby.players.length > 0) {
                    return (
                        <ListGroup.Item
                            key={i}
                            onClick={() => handleClick(lobby, i)}>
                            <p>
                                {lobby.owner.username}'s {game.name} lobby {lobby.players.length}/{lobby.limit}
                            </p>
                        </ListGroup.Item>
                    )
                }
            })}

        </ul>
    )

}


//lobby onclick will have props that are just GET_USER_LOBBIES[i] where i is just the map iterator