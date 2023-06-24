import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD6 } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Home.css';

const Home = () => {
  return (
    <Container className="home-container">
      <Row>
        <Col md={6}>
          <h1>Website Title*</h1>
        </Col>
        <Col md={6}>
          <p>Brief Description of the website*</p>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="text-center">
          <div className="hexagon">
            <FontAwesomeIcon icon={faDiceD6} size="6x" className="hexagon-icon" />
            <p>Total Games</p>
            <p>300</p>
          </div>
        </Col>
        <Col md={6} className="text-center">
          <div className="hexagon">
            <FontAwesomeIcon icon={faDiceD6} size="6x" className="hexagon-icon" />
            <p>Total Players</p>
            <p>4</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center">
          <h3>New to WebsiteName? Signup Now!</h3>
          <button>Signup</button>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2>Our Goal</h2>
        </Col>
        <Col md={6}>
          <p>Description for our goal.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;