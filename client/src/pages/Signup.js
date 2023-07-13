import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/Signup.css';
// import { IKImage, IKContext, IKUpload } from 'imagekitio-react'

const Signup = () => {

  // info for image uploads
  const publicKey = "public_HCJZE+YwKYecvofGGZ+jCfHG1yw=";
  let urlEndpoint = "https://ik.imagekit.io/ofawn8dpgq/";
  const authenticationEndpoint = "https://www.yourserver.com/auth";

  const avatar1 = 'https://ik.imagekit.io/ofawn8dpgq/Project3_Avatars/defaultAvatar1.png?updatedAt=1688305286552';
  const avatar2 = 'https://ik.imagekit.io/ofawn8dpgq/Project3_Avatars/defaultAvatar4.png?updatedAt=1688305286455'
  const avatar3 = 'https://ik.imagekit.io/ofawn8dpgq/Project3_Avatars/defaultAvatar5.png?updatedAt=1688305286440';
  const avatar4 = 'https://ik.imagekit.io/ofawn8dpgq/Project3_Avatars/defaultAvatar3.png?updatedAt=1688305286435';
  const avatar5 = 'https://ik.imagekit.io/ofawn8dpgq/Project3_Avatars/defaultAvatar7.png?updatedAt=1688305286447'
  const avatar6 = 'https://ik.imagekit.io/ofawn8dpgq/Project3_Avatars/defaultAvatar2.png?updatedAt=1688305286483'


  const [AddUser] = useMutation(ADD_USER);
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', firstName: '', lastName: '', avatarURL: avatar1 });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleAvatarClick = (avatar, e) => {
    setUserFormData({ ...userFormData, avatarURL: avatar });
    const selectedAvatar = e.target.classList[1];
    document.querySelector(".selectedAvatar").innerHTML = `Selection: ${selectedAvatar}`;
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
      const { data } = await AddUser({
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
      firstName: '',
      lastName: '',
      avatarURL: ''
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
            <Form.Label htmlFor='username'>FIRST NAME</Form.Label>
            <Form.Control
              type='text'
              placeholder='First Name'
              name='firstName'
              onChange={handleInputChange}
              value={userFormData.firstName}
              required
            />
          </div>
        </Form.Group>

        <Form.Group className='m-4 p-1'>
          <div className="text-center">
            <Form.Label htmlFor='username'>LAST NAME</Form.Label>
            <Form.Control
              type='text'
              placeholder='Last Name'
              name='lastName'
              onChange={handleInputChange}
              value={userFormData.lastName}
              required
            />
          </div>
        </Form.Group>

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

        <div className='avatarGroup'>
          <h4>Choose a default avatar: </h4>
          <div className='avatarWrapper'>
            <div onClick={(e) => handleAvatarClick(avatar1, e)}>
              <img className='avatarSelect Avatar1' src={avatar1} />
            </div>

            <div onClick={(e) => handleAvatarClick(avatar2, e)}>
              <img className='avatarSelect Avatar2' src={avatar2} />
            </div>

            <div onClick={(e) => handleAvatarClick(avatar3, e)}>
              <img className='avatarSelect Avatar3' src={avatar3} />
            </div>

            <div onClick={(e) => handleAvatarClick(avatar4, e)}>
              <img className='avatarSelect Avatar4' src={avatar4} />
            </div>

            <div onClick={(e) => handleAvatarClick(avatar5, e)}>
              <img className='avatarSelect Avatar5' src={avatar5} />
            </div>

            <div onClick={(e) => handleAvatarClick(avatar6, e)}>
              <img className='avatarSelect Avatar6' src={avatar6} />
            </div>
          </div>

          <p className='selectedAvatar'></p>

          {/* 

          Nice to have:
          Add in code to allow the user to select their own image from their device
          Here is my URL endpoint: https://ik.imagekit.io/ofawn8dpgq/
           */}

          <div className='avatarUploadGroup'>
            {/* <h4>Or, upload your own avatar:</h4> */}
            {/* <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint} >
              <IKUpload fileName="abc.jpg" tags={["tag1"]} useUniqueFileName={true} isPrivateFile={false} />
            </IKContext> */}

          </div>



        </div>

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
