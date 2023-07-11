import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import {useQuery} from '@apollo/client';
import {GET_USER} from '../utils/queries';
import '../styles/Home.css';

const Home = () => {

  const { loading, data } = useQuery(GET_USER, {
    variables: { username: "testUser333"}
  });

  const userData = data?.getUser || {};

  const navigate = useNavigate(); // <-- Initialize useNavigate hook

  const handleSignupClick = () => {
    navigate('/signup'); // <-- Navigate to /signup route when Signup button is clicked
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  console.log(userData);

  return (
    <Container>
      <Row>
        <Col md={5} className="align-self-center text-center">
          <h1 className="website-title">Website Title*</h1> {/* <-- Added custom class */}
        </Col>
        <Col md={7} className="align-self-center text-center">
          <p className="brief-description">Brief Description of the website*</p> {/* <-- Added custom class */}
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
                <span>4</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center">
          <h3>New to WebsiteName? Signup Now!</h3>
          <button onClick={handleSignupClick}>Signup</button> {/* <-- Added onClick handler */}
        </Col>
      </Row>
      <Row>
        <Col md={5} className="text-center">
          <h2 className="our-goal">Our Goal</h2> {/* <-- Added custom class */}
        </Col>
        <Col md={7} className="text-center">
          <p className="goal-description">Description for our goal.</p> {/* <-- Added custom class */}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
