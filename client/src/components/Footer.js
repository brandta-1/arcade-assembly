import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <Row className="footer">
      <Col md={12} className="text-center">
        Made with <FontAwesomeIcon icon={faHeart} /> from Charlotte, NC
      </Col>
    </Row>
  );
};

export default Footer;
