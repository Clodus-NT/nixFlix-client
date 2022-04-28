import React from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap';

import "./genre-view.scss";

export class GenreView extends React.Component {
    render() {
        const { genre } = this.props;

        console.log("pizza")


        return (
            <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title> {genre?.Name} </Card.Title>
                            <Card.Text>Description: {genre?.Description} </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Container>
        )
    }
}