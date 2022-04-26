import React, { useState } from 'react';
import {Form, Button, Card, Cardgroup, Container, Col, Row, CardGroup } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    //Requests server for authentication
    //then calls props.onLoggedIn(username)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    }

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