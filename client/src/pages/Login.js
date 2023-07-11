import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/Signup.css';

const Login = () => {

  const [loginUser] = useMutation(LOGIN_USER);
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
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
      //usemutation function, send the form data
      const {data} = await loginUser({
        variables: { ...userFormData }
      });

      //successful mutation returns a token, store that in local storage, and redirect to homepage
      const { token } = await data.login;
      console.log(token);
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
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        Uh Oh! Something went wrong with your Login credentials!
        </Alert>
        <Form.Group className='m-4 p-1'>
        <div className="text-center">
            <Form.Label htmlFor='email'>EMAIL</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Email you Signed up With'
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
              placeholder='Enter Your Password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
          </div>  
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        <div className='text-center'>
          <Button
            disabled={!(userFormData.email && userFormData.password)}
            type='submit'
            variant='success'>
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Login;