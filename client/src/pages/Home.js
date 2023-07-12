import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import {useQuery} from '@apollo/client';
import {GET_USERS} from '../utils/queries';
import '../styles/Home.css';

const Home = () => {

  const { loading, data } = useQuery(GET_USERS);
  const userData = data?.getUsers || [];
  console.log(userData.length);
  const numUsers = userData.length;

  const navigate = useNavigate(); // <-- Initialize useNavigate hook

  const handleSignupClick = () => {
    navigate('/signup'); // <-- Navigate to /signup route when Signup button is clicked
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }


  return (
    <Container>
      <Row>
        <Col md={6} className="align-self-center text-center">
          <h1 className="website-title">Arcade Assembly</h1>
        </Col>
        <Col md={6} className="align-self-center text-center">
          <p className="brief-description">A digital hub where gamers can find their next favorite game, connect with fellow players, and dive into a world of gaming exploration.</p> {/* <-- Added custom class */}
        </Col>
      </Row>
      <Row>
        <Col md={6} className="text-center">
          <div className="hexagon">
            <div className="shield-wrapper">
              <FontAwesomeIcon icon={faShield} size="lg" className="shield-icon" />
              <div className="shield-text">
                <p>Total Games</p>
                <span>244,277</span>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6} className="text-center">
          <div className="hexagon">
            <div className="shield-wrapper">
              <FontAwesomeIcon icon={faShield} size="lg" className="shield-icon" />
              <div className="shield-text">
                <p>Total Players</p>
                <span> {numUsers} </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center">
          <h3 className="sign-up-text">New to Arcade Assembly? Signup Now!</h3>
          <button onClick={handleSignupClick}>Signup</button> {/* <-- Added onClick handler */}
        </Col>
      </Row>
      <Row>
        <Col md={5} className="text-center">
          <h2 className="our-goal">Our Goal</h2>
        </Col>
        <Col md={7} className="text-center">
          <p className="goal-description">At Arcade Assembly, our goal is to create an inclusive gaming community, making it more enjoyable and accessible for everyone. We aim to provide a platform for discovery, where users can find new games, meet like-minded players, and participate in a vibrant gaming culture.</p> {/* <-- Added custom class */}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;