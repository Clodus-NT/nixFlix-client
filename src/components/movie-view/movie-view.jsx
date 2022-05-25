import React from 'react';
import axios from 'axios';
import {Button, Card, Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {

    removeFromFavorite = (event) => {
        event.preventDefault()

        console.log('adding to favorite: ', this.props.movie, this.props.user)
    
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        console.log('remove', token)
    
        axios
          .delete(
            `https://nixflix-93.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {},
            {
              headers: { Authorization:`Bearer ${token}`}
            }
          )
          .then(() => {
            alert(`${this.props.movie.Title} was removed from your favorites list`);
          })
          .catch((err) => {
            console.log(err);
      })
    }

    addFavorite = (event) => {
        event.preventDefault();

        console.log('adding to favorite: ', this.props.movie, this.props.user)
    
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        console.log('movie view: ', token);
    
        axios
          .post(
            `https://nix-flix-93.herokuapp.com/users/${username}/Movies/${this.props.movie._id}`, {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(() => {
            alert(`${this.props.movie.Title} was added to your favorites list`);
          })
          .catch((err) => {
            console.log(err);
          });
    }

    render () {
        const { movie } = this.props;
        const isMovieAFavorite = this.props.user.FavoriteMovies.includes(this.props.movie._id);
        console.log('single movie view: ')


        // const addFavorite = (e, movie) => {
        //     e.preventDefault();
        
        //     const username = localStorage.getItem("user");
        //     const token = localStorage.getItem("token");
        
        //     axios
        //       .post(
        //         `https://nix-flix-93.herokuapp.com/users/${username}/Movies/${movie}`,
        //         {
        //           headers: { Authorization: `Bearer ${token}` },
        //         }
        //       )
        //       .then(() => {
        //         alert(`${movie.Title} was removed from your favorites list`);
        //         window.open("/users/:username", "__self");
        //       })
        //       .catch((err) => {
        //         console.log(err);
        //       });
        //   }

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
                                <Route path=".movies/:movieId" render={({ match, history }) => {
                                    return <Col md={8}>
                                        <MovieView movie={movie.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                                    </Col>
                                }} />
                                <Button
                                    variant="primary"
                                    className="custom-btn"
                                    onClick={(event) => isMovieAFavorite ? this.removeFromFavorite(event) : this.addFavorite(event)}
                                >
                                    { isMovieAFavorite ? 'Remove From Favorites' : 'Add to favorites' }
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