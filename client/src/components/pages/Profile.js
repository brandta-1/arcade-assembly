import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import query single profile
import { GET_USER, GET_ME } from '../../utils/queries';
import '../../styles/Profile.css'

const Profile = () => {
  const { username } = useParams();
  console.log(username);

  const { loading, data } = useQuery(
    username ? GET_USER : GET_ME,
    {
      variables: { username }
    }
  );

  const userData = data && data.getUser;
  console.log(userData);

  const [showList, setShowList] = useState([
    { id: 1, show: true },
    { id: 2, show: true },
    { id: 3, show: true },
  ]);

  if (loading) {
    return <div>Loading...</div>
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
                    <h4>{friend.gamertag}</h4>
                    <p>{friend.firstName} {friend.lastName}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        ),
    },

    { 
      id: 2, 
      label: 'Lobbies', 
      content: 
      <div>Lobbies List Here</div> 
    },
    
    { id: 3, label: 'Other', content: <div>Other List Here</div> }
  ];

  return (
    <div>
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
            <div>
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
