import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/Profile.css'

const ProfileList = () => {
    const { loading, data } = useQuery(GET_USERS);
    const userData = data?.getUsers || [];
    const navigate = useNavigate();

    console.log(userData);
    const numUsers = userData.length;

    const goBack = () => {
        navigate(-1);
    }

    if (loading) {
        return <p>Profiles Loading...</p>
    }

    return (
        <div>
            <div className="back-button" onClick={goBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Go Back</span>
            </div>
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
