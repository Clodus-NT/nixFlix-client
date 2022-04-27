import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardGroup, Container, Row, Col} from 'react-bootstrap';

import { Link } from "react-router-dom";

import './movie-card.scss';


export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
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
                                        <Link to={`/movies/${movie._id}`}>
                                            <Button variant="link">See more</Button>
                                        </Link>
                                    </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        ) 
    }
}