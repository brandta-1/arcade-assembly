import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function LobbyArray(props) {

    const navigate = useNavigate();

    const lobbies = props?.lobbies?.getGameLobbies || props?.lobbies?.getUserLobbies;
    let game = props?.game;

    const handleClick = (lobby, index) => {

        if(game == "profile"){
            game=lobby.game
        }

        const lobbyProps = {
            game: game,
            lobby: lobbies[index]
        }
        
        navigate(`/lobby/${lobby._id}`,
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
                        onClick={() => handleClick(lobby,i)}>
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