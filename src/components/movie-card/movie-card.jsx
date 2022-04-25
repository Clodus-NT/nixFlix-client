import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';


export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        console.log(movie);
        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        ) 
    }
}