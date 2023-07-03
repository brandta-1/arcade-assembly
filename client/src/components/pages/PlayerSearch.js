
import React, {useState} from 'react';
import { searchGames } from '../../utils/API';
import { Form, Button, Col, Row } from 'react-bootstrap';




const PlayerSearch = () => {

  const [searchInput, setSearchInput] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!searchInput) {
      return false;
    }
  
    try {
      const res = await searchGames(searchInput);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }




const PlayerSearch = () => {

  return (
    <div>
      <h2>Player Search Page</h2>
      <p>This is the Player Search page.</p>

      <h1>game search test: search a game, then check the console!</h1>
      <Form onSubmit={handleFormSubmit}>
        <Row>
          <Col xs={12} md={8}>
            <Form.Control
              name='searchInput'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type='text'
              size='lg'
              placeholder='Search for a game'
            />
          </Col>
          <Col xs={12} md={4}>
            <Button type='submit' variant='success' size='lg'>
              Submit Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PlayerSearch;