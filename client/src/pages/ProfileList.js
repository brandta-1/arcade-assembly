import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import { Link } from 'react-router-dom';
import '../styles/Profile.css'

const ProfileList = () => {
    const { loading, data } = useQuery(GET_USERS);
    const userData = data?.getUsers || [];
    console.log(userData);
    const numUsers = userData.length;

    if (loading) {
        return <p>Profiles Loading...</p>
    }

    return (
        <div>
            <h1>Our {numUsers} Users:</h1>
            <hr />
            <div>
                {userData.length === 0 ? (
                    <p>No users yet</p>
                ) :  (
                    userData.map((user) => (


                        <Link to={`/profile/${user._id}`}>
                        <div className='profileHeader'>
                        <h2>{user.username}</h2>
                        <img className='listAvatar' src={user.avatarURL} /> 
                        </div>
                        </Link>

                        
                    ))
                )}
            </div>
        </div>
    )
}
export default ProfileList;