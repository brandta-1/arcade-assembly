import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Home.css';

const Home = () => {

  const navigate = useNavigate(); // <-- Initialize useNavigate hook

  const handleSignupClick = () => {
    navigate('/signup'); // <-- Navigate to /signup route when Signup button is clicked
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="align-self-center text-center">
          <h1>Website Title*</h1>
        </Col>
        <Col md={6} className="align-self-center text-center">
          <p>Brief Description of the website*</p>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="text-center">
          <div className="hexagon">
            <div className="shield-wrapper">
              <FontAwesomeIcon icon={faShield} size="lg" className="shield-icon" />
              <div className="shield-text">
                <p>Total Games</p>
                <span>300</span>
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
        <Col md={6} className="text-center">
          <h2>Our Goal</h2>
        </Col>
        <Col md={6} className="text-center">
          <p>Description for our goal.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
