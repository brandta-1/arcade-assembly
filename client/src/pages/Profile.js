import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_USER, GET_ME, GET_USER_LOBBIES } from '../utils/queries';
import { LobbyArray } from '../components/LobbyArray';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/Profile.css'

import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../utils/mutations';
import { REMOVE_FRIEND } from '../utils/mutations';

import Auth from '../utils/auth'

const Profile = () => {

  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUserId = Auth.getProfile().data._id
  const { loading: userLoading, data: userQueryData } = useQuery(userId ? GET_USER : GET_ME, { variables: { userId } });
  const { loading: lobbyLoading, data: userLobbyData } = useQuery(GET_USER_LOBBIES, { variables: { userId: userId } })

  const userData = userQueryData?.getUser || userQueryData?.me || {};
  const userLobbies = userLobbyData || {}

  const [removeFriend] = useMutation(REMOVE_FRIEND);
  const removeFriendButton = async (userId, friendId) => {
    try {
      const { data } = await removeFriend({
        variables: {
          userId: userId,
          friendId: friendId
        }
      })
      // redirect back to /me route 
      window.location.assign('/me')
    } catch (err) {
      console.log("Friend not removed")
    }
  }

  const [addFriend] = useMutation(ADD_FRIEND);
  const addFriendButton = async (userId, friendId) => {

    try {
      const { data } = await addFriend({
        variables: {
          userId: userId,
          friendId: friendId
        }
      })
      // redirect back to /me route 
      window.location.assign('/me')
    } catch (err) {
      console.log("Friend not added")
    }
  }

  const friendButton = () => {
    if (userId === currentUserId || userId === undefined) {
      return ""
    }
    // change to a span rather than a button
    return <span onClick={() => addFriendButton(currentUserId, userId)}>Add Friend</span>
  }

  const [showList, setShowList] = useState([
    { id: 1, show: false },
    { id: 2, show: false },
    { id: 3, show: false },
  ]);

  if (userLoading || lobbyLoading) {
    return <div>Profile Loading...</div>
  }

  const handleClick = (id) => {

    setShowList((prevLists) =>
      prevLists.map((list) =>
        list.id === id ? { ...list, show: !list.show } : list
      )
    );
  };

  const goBack = () => {
    navigate(-1);
  }

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
                  <p key={friend._id} className='removeFriend' onClick={() => removeFriendButton(currentUserId, friend._id)}>X</p>
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

        <LobbyArray lobbies={userLobbyData} game={"profile"} />


    },
    { id: 3, label: 'Favorite Games', content: <div>Coming Soon</div> }
  ];

  return (
    <div className='profileContainer'>

      <div className='profileAction'>
        <div className="back-button" onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Go Back</span>
        </div>
        <div className='addFriendButton'> {friendButton()} </div>

      </div>

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
