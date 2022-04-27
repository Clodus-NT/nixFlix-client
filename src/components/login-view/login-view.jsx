import React, { useState } from 'react';
import {Form, Button, Card, Cardgroup, Container, Col, Row, CardGroup } from 'react-bootstrap';
import axios from 'axios';
import './login-view.scss';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    //Requests server for authentication
    //then calls props.onLoggedIn(username)
    const handleSubmit = (e) => {
        e.preventDefault();
        //Sends authentication request to server
        axios.post('https://nixflix-93.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log('no such user');
        });
    };

    return (
        <Container id='login-view-container'>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Title id='login-view-card-title'>
                                Welcome to nixFlix!
                            </Card.Title>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username: </Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            onChange={e => setUsername(e.target.value)}
                                            placeholder="Enter your username" />
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password: </Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Enter your username"
                                        />
                                    </Form.Group>
                                    <Button 
                                        id='login-view-submit-button'
                                        variant="primary" 
                                        type="submit" 
                                        onClick={handleSubmit}>Submit</Button>
                                    {/* <Button>Register</Button> */}
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
        
        // <form>
        //     <label>
        //         Username: 
        //         <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        //     </label>
        //     <label>
        //         Password:
        //         <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        //     </label>
        //     <button type="submit" onClick={handleSubmit}>Submit</button>
        //     <button type="button" onClick={handleSubmit}>Register</button>
        // </form>
    )
}