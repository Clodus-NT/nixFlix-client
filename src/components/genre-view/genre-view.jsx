import React from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap';

import "./genre-view.scss";

export class GenreView extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title> {movie.Genre.Name} </Card.Title>
                            <Card.Text>Description: {movie.Genre.Description} </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Container>
        )
    }
}