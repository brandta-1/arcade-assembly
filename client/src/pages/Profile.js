import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_ME, GET_USER_LOBBIES } from '../utils/queries';
import { Link } from 'react-router-dom';
import '../styles/Profile.css'

const Profile = () => {
  const { username } = useParams();
  console.log(username);

  const { loading: userLoading, data: userQueryData } = useQuery(username ? GET_USER : GET_ME, { variables: { username } });
  const { loading: lobbiesLoading, data: userLobbiesData } = useQuery(GET_USER_LOBBIES, { variables: { username } })

  const userData = userQueryData?.getUser;
  console.log("User Data", userData);

  const lobbiesData = userLobbiesData?.getUserLobbies;
  console.log("Lobbies Data", lobbiesData);

  const [showList, setShowList] = useState([
    { id: 1, show: false },
    { id: 2, show: false },
    // { id: 3, show: false },
  ]);

  if (userLoading) {
    return <div>Profile Loading...</div>
  }
  if (lobbiesLoading) {
    return <div>Lobbies Loading...</div>
  }

  const handleClick = (id) => {
    setShowList((prevLists) =>
      prevLists.map((list) =>
        list.id === id ? { ...list, show: !list.show } : list
      )
    );
  };

  const listContent = [
    {
      id: 1,
      label: 'Friends',
      content:
        (
          <div>
            {userData.friends.length === 0 ? (
              <p>No friends yet</p>
            ) : (
              userData.friends.map((friend) => (
                <div className='friendCard'>
                  <img className='friendAvatar' src={friend.avatarURL} />
                  <div className='headerText'>
                    <h4>{friend.username}</h4>
                    <p>{friend.firstName} {friend.lastName}</p>
                  </div>
                </div>
              ))
            )}
            {/* Link to see all users in our DB */}
            <div>
              <Link to={`/profilesList`}>
              <button>See All Users</button>
              </Link>
            </div>
          </div>
        ),
    },
    {
      id: 2,
      label: 'Lobbies',
      content:
        (
          <div>
            {lobbiesData.length === 0 ? (
              <p>No lobbies for this user</p>
            ) : (
              <div>
                <h1> {lobbiesData.game.name} </h1>
                <img src={lobbiesData.game.cover} />
                <p>Owner: {lobbiesData.owner.username}</p>
                <div>
                  <h4>Players: </h4>
                  {lobbiesData.players.map((player) => (
                    <p>{player.username}</p>
                  ))}
                  <p>Lobby Size: {lobbiesData.limit} </p>
                </div>
              </div>        
            )}
          </div>
        )
    },
    // { id: 3, label: 'Other', content: <div>Other List Here</div> }
  ];

  return (
    <div className='profileContainer'>
      <div className='profileHeader'>
        <img className='avatar' src={userData.avatarURL} />
        <div className='headerText'>
          <h1> {userData.username} </h1>
          <hr />
          <h3> {userData.firstName} {userData.lastName} </h3>
          <p> {userData.email} </p>
        </div>
      </div>

      <div className='outsideWrapper'>
        {listContent.map(({ id, label, content }) => (
          <div className='listWrapper'>
            <div key={id} className='buttonWrapper'>
              <button className='listButton' onClick={() => handleClick(id)}>
                {showList.find((list) => list.id === id)?.show ? 'Hide' : 'Show'}{' '}
                {label}
              </button>
            </div>
            {showList.find((list) => list.id === id)?.show && (
              <div className='listContent'>{content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
