import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/Signup.css';

const Signup = () => {

  const [AddUser] = useMutation(ADD_USER);
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      //see login.js for comments
      const {data} = await AddUser({
        variables: { ...userFormData }
      });
     
      const { token } = await data.addUser;
      Auth.login(token);

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Uh Oh - Something went wrong with your Signup!
        </Alert>

        <Form.Group className='m-4 p-1'>
        <div className="text-center">
          <Form.Label htmlFor='username'>USERNAME</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter a Username - Use Discord Name if Possible'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
        </div>
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='m-4 p-1'>
        <div className="text-center">
          <Form.Label htmlFor='email'>EMAIL</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter a Working Email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </div>
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='m-4 p-1'>
          <div className="text-center">
            <Form.Label htmlFor='password'>PASSWORD</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter a Password (Min. 7 Characters)'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
        </div>  
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <div className="text-center">
          <Button
            disabled={!(userFormData.username && userFormData.email && userFormData.password)}
            type='submit'
            variant='success'>
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Signup;
