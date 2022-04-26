import React, {useState} from 'react';
import { Form, Button, Card, Cardgroup, Container, Col, Row, CardGroup } from 'react-bootstrap';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onRegistration(username);
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
                                            value="email"
                                            onChange={e => setEmail(e.target.value)}
                                            required
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
                                    <Button id='registration-view-button' type="button" onClick={handleSubmit}>Register</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
}