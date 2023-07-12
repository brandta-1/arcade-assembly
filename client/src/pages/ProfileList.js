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

    console.log(userData);
    return (
        <div>
            <h3>Arcade Assembly Roster: {numUsers}</h3>
            <hr />
            <div className='profileListWrapper'>
                {userData.length === 0 ? (
                    <p>No users yet</p>
                ) : (
                    userData.map((user) => (

                        <Link className='profileListLinks' to={`/profile/${user._id}`}>
                            <div className='profileHeader listHeader'>
                                <div className='listText'>
                                    <h2>{user.username}</h2>
                                    <h5>{user.firstName} {user.lastName}</h5>

                                    <hr />

                                    <div className='userMetrics'>
                                        <p>Friends: {user.friends.length} </p>
                                        <p>Lobbies: 0 </p>
                                    </div>
                                </div>
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