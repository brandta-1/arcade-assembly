import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function LobbyArray({lobbies, game}) {

    const navigate = useNavigate();

    const handleClick = (lobby, index) => {

        const lobbyProps = {
            game: game,
            lobby: lobbies[index]
        }
        
        navigate(`/lobby/${lobby}`,
        {
            state: { lobby: lobbyProps}
        });

    };
   
    if (!lobbies) {
        return (
            <p>loading...</p>
        )
    }

    return (
        <ul>
            {lobbies.length === 0 && "No Lobbies Yet"}
            {lobbies.map((lobby, i) => {

                return (

                    <ListGroup.Item
                        key={i}
                        onClick={() => handleClick(lobby._id,i)}>
                        <p>
                            {lobby.owner.username}'s {game.name} lobby {lobby.players.length}/{lobby.limit}
                        </p>

                    </ListGroup.Item>
        
                )
            })}

        </ul>
    )

}


//lobby onclick will have props that are just GET_USER_LOBBIES[i] where i is just the map iterator