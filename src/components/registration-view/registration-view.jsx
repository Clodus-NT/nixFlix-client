import React, {useState} from 'react';
import axios from 'axios';
import { Form, Button, Card, Cardgroup, Container, Col, Row, CardGroup } from 'react-bootstrap';
import './registration-view.scss'

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(username, password);
        // props.onRegistration(username);
        axios.post('https://nixflix-93.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email
            // Birthday: birthday
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            //'_self' is needed so the page will open in the same tab
            window.open('/', '_self');
        })
        .catch(e => {
            console.log('error registering the user')
        });
    };

    return (
        <Container id='registration-view-container'>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Title id='registration-view-card-title'>
                                Get started using nixFlix!
                            </Card.Title>
                            <Card.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>
                                            Email: 
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            placeholder="Enter a valid email address"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>
                                            Username: 
                                        </Form.Label>
                                            <Form.Control 
                                            type="text" 
                                            value={username} 
                                            onChange={e => setUsername(e.target.value)} required
                                            placeholder="Choose a username"
                                            />
                                    </Form.Group>

                                    {/* <Form.Group>
                                        <Form.Label>
                                            Birthday: 
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={birthday}
                                            onChange={e => setBirthday(e.target.value)}
                                            required
                                            placeholder="Enter your birthday"
                                        />
                                    </Form.Group> */}

                                    <Form.Group>
                                        <Form.Label>
                                            Password: 
                                        </Form.Label>
                                            <Form.Control 
                                                type="password" 
                                                value={password} 
                                                onChange={e => setPassword(e.target.value)} required
                                                placeholder="Choose a password"
                                            />
                                    </Form.Group>
                                    <Button id='registration-view-button' type="submit" variant="primary" onClick={handleSubmit}>Register</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
}