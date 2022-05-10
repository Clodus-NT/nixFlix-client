import React from 'react';
import axios from 'axios';
import {Button, Card, Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {

    removeFromFavorite = (event) => {
        event.preventDefault()
        console.log('adding to foavorite: ', this.props.movie, this.props.user)
    
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        console.log('remove', token)
    
        axios
          .delete(
            `https://nixflix-93.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
            {
              headers: { Authorization:`Bearer ${token}`}
            }
          )
          .then(() => {
            alert(`${this.props.movie.Title} was removed to your favorites list`);
          })
          .catch((err) => {
            console.log(err);
      })
    }

    addFavorite = (event) => {
        event.preventDefault()
        console.log('adding to foavorite: ', this.props.movie, this.props.user)
    
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        console.log('movie view:', token)
    
        axios
          .post(
            `https://nixflix-93.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {},
            {
              headers: { Authorization:`Bearer ${token}`}
            }
          )
          .then(() => {
            alert(`${this.props.movie.Title} was added to your favorites list`);
          })
          .catch((err) => {
            console.log(err);
      })
    }

    render () {
        const { movie } = this.props;
        const isMovieAFavorite = theis.props.user.FavoriteMovies.includes(this.props.movieId);

        const addFavorite = (event) => {
            event.preventDefault();
        
            const username = localStorage.getItem("user");
            const token = localStorage.getItem("token");

            console.log(movie);
        
            axios
              .post(
                `https://nixflix-93.herokuapp.com/users/${username}/movies/${movie._id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              )
              .then(() => {
                alert(`${movie.Title} was added to your favorites list`);
              })
              .catch((err) => {
                console.log(err);
              });
          }

        return (
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Img crossOrigin="*" src={movie.ImagePath} />
                                <Card.Title>{movie.Title}</Card.Title>
                                <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                                <Card.Text>Synopsis: {movie.Description} </Card.Text>
                                <Card.Text>Director: {movie.Director.Name} </Card.Text>
                                <Card.Text> About the director: {movie.Director.Bio} </Card.Text>
                                <Button
                                    variant="primary"
                                    className="custom-btn"
                                    onClick={(event) => isMovieAFavorite ? this.removeFromFavorite(event) : this.addFavorite(event)}
                                >
                                    { isMovieAFavorite ? 'Remove From Favorites' : 'Add To Favorites'}
                                </Button>
                                <Link to={`/directors/${movie.Director.Name}`} >
                                    <Button variant="link">Director Info</Button>
                                </Link>
                                <Link to={`/genres/${movie.Genre.Name}`}>
                                    <Button variant="link">Genre Info</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}