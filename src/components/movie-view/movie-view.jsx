import React from 'react';
import {Button, Card, Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
    // keypressCallback(event) {
    //     console.log(event.key);
    // }

    // componentDidMount() {
    //     document.addEventListener('keypress', this.keypressCallback);
    // }

    // componentWillUnmount() {
    //     document.removeEventListener('keypress', this.keypressCallback);
    // }

    render () {
        const { movie, onBackClick } = this.props;

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
                                {/* <Button onClick={() => {onBackClick(null) }}>Back</Button> */}
                                <Link to={`/directors/${movie.Director.Name}`}>
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
            // <div className="movie-view">
            //     <div className="movie-poster">
            //         <img crossOrigin="*" src={movie.ImagePath} />
            //     </div>
            //     <div className="movie-title">
            //         <span className="label">Title: </span>
            //         <span className="value">{movie.Title}</span>
            //     </div>
            //     <div className="movie-description">
            //         <span className="label">Description: </span>
            //         <span className="value">{movie.Description}</span>
            //     </div>
            //     <button onClick={() => {onBackClick(null); }}>Back</button>
            // </div>

        );
    }
}