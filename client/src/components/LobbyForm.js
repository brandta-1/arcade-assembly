import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';
import { CREATE_LOBBY } from '../utils/mutations';

export function LobbyForm({game}) {
    console.log(game);

    const [createLobby] = useMutation(CREATE_LOBBY);
    const [formData, setFormData] = useState({ about: '', limit: '' })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputNumChange = (event) => {
        const { name, valueAsNumber } = event.target;
        setFormData({ ...formData, [name]: valueAsNumber });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        console.log("form data", formData)
        console.log(game._id,formData.limit,formData.about)
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        try {
            
            const data = await createLobby({
                variables: {
                    gameId: game._id,
                    limit: formData.limit,
                    about: formData.about
                }
            });
        } catch (err) {
            console.error(err);
        }

        setFormData({
            about: '',
            limit: '',

        });
    }

    return (

        <>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className='m-4 p-1'>
                    <div className="text-center">
                        <Form.Label htmlFor='about'></Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Lobby description'
                            name='about'
                            onChange={handleInputChange}
                            value={formData.about}
                            required
                        />
                    </div>
                </Form.Group>

                <Form.Group className='m-4 p-1'>
                    <div className="text-center">
                        <Form.Label htmlFor='limit'></Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Player limit [2-64]'
                            name='limit'
                            onChange={handleInputNumChange}
                            value={formData.limit}
                            required
                        />
                    </div>
                    <Form.Control.Feedback type='invalid'>Enter a number between 2 and 64 inclusive</Form.Control.Feedback>
                </Form.Group>

                <div className='text-center'>
                    <Button
                        disabled={!(formData.about && formData.limit)}
                        type='submit'
                        variant='success'>
                        Create New Lobby
                    </Button>
                </div>
            </Form>
        </>
    )
}