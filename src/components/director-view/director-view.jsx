import React from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap';

import "./director-view.scss";

export class DirectorView extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {/* <Card.Title>{movie.director.Name}</Card.Title>
                            <Card.Text>Bio: {director.Bio}</Card.Text>
                            <Card.Text>Birth: {director.Birth}</Card.Text> */}
                            <Card.Text> {movie.Director.Name} </Card.Text>
                            <Card.Text>Birth: {movie.Director.Birth} </Card.Text>
                            <Card.Text>About the director: {movie.Director.Bio} </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Container>
        )
    }
}