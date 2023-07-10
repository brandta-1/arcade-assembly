import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import query single profile
import { GET_USER, GET_ME } from '../utils/queries';

const Profile = () => {

  const { username } = useParams();

  console.log(username);
  
  const { loading, data } = useQuery(
    username ? GET_USER : GET_ME,
  {
    variables: { username }
  }
  );

  if (loading) {
    return <div>Loading...</div>
  }

  const userData = data && data.getUser;
  console.log(userData);

  return (
    <div>
      <h2>Profile Page</h2>
      <p> {userData.firstName} </p>
      <p> {userData.lastName} </p>
      <p> {userData.username} </p>
      <p> {userData.email} </p>
      <img src={userData.avatarURL}/>

    </div>
  );
};

export default Profile;
