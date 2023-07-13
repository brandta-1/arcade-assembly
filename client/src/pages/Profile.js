import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_USER, GET_ME, GET_USER_LOBBIES } from '../utils/queries';
import { LobbyArray } from '../components/LobbyArray';
import { Link } from 'react-router-dom';
import '../styles/Profile.css'

const Profile = () => {
  const { userId } = useParams();
  console.log(userId);

  const { loading: userLoading, data: userQueryData } = useQuery(userId ? GET_USER : GET_ME, { variables: { userId } });
  const {loading: lobbyLoading, data: userLobbyData} = useQuery(GET_USER_LOBBIES, {variables: {userId: userId}})
  
  
  
  //getUserLobbies({ variables: { userId } })
  
  console.log(userQueryData?.me);
  console.log(userQueryData?.getUser);
  // const { loading: lobbiesLoading, data: userLobbiesData } = useQuery(GET_USER_LOBBIES, { variables: { username } })

  const userData = userQueryData?.getUser || userQueryData?.me || {};
  console.log("User Data", userData);

  const userLobbies = userLobbyData || {}
  console.log("user lobbies", userLobbies)

  
    
  
  // const lobbiesData = userLobbiesData?.getUserLobbies;
  // console.log("Lobbies Data", lobbiesData);

  const [showList, setShowList] = useState([
    { id: 1, show: false },
    { id: 2, show: false },
    { id: 3, show: false },
  ]);

  if (userLoading || lobbyLoading) {
    return <div>Profile Loading...</div>
  }
  // if (lobbiesLoading) {
  //   return <div>Lobbies Loading...</div>
  // }

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
        )
    },
    {
      id: 2,
      label: 'Lobbies',
      content:
        <LobbyArray lobbies={userLobbyData} game={"profile"}/>
        
    },
    { id: 3, label: 'Favorite Games', content: <div>Coming Soon</div> }
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
