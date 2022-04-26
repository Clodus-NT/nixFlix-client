import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardGroup, Container, Row, Col} from 'react-bootstrap';

import './movie-card.scss';


export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        console.log(movie);
        return (
            <Container>
                <Row id='movie-card-row'>
                    <Col id='movie-card-col'>
                        <CardGroup>
                            <Card id='movie-card-card'>
                                <Card.Img id='movie-card-img' variant="top" src={movie.ImagePath} />
                                    <Card.Body>
                                        <Card.Title>{movie.Title}</Card.Title>
                                        <Card.Text>Director: {movie.Director.Name}</Card.Text>
                                        <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                                    </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        ) 
    }
}