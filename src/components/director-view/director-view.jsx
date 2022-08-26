import React from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap';

import "./director-view.scss";

export class DirectorView extends React.Component {
    render() {

        const { director } = this.props;

        return (
            <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title> {director?.Name} </Card.Title>
                            <Card.Text>Born in: {director?.Birth} </Card.Text>
                            <Card.Text>About the director: {director?.Bio} </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Container>
        )
    }
}