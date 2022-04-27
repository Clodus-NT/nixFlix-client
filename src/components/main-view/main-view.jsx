import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Col, Row } from 'react-bootstrap';
import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state= {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount(){
        axios.get('https://nixflix-93.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    //When a movie is clicked, function is invoked and updates
    //the state of the selectedMovie property to that movie
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    getMovies(token) {
        axios.get('https://nixflix-93.herokuapp.com/login', {
            headers: { Authorization:`Bearer ${token}`}
        })
        .then(response => {
            //Assign result of state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    //On succesful login, function updates the user property in 
    //state to that user
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        //If no user, render LoginView
        //If there is a user logged in, user details are passed
        //as a prop to LoginView
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        //Before movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Container>
                <Row className="main-view justify-content-md-center">
                    {selectedMovie
                        ?   (
                            <Col md={8}>
                                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        )
                        :   movies.map(movie => (
                            <Col md={3}>
                                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        );
    }
}


// import React from 'react';
// import axios from 'axios';

// import { LoginView } from '../login-view/login-view';
// import { MovieView } from '../movie-view/movie-view';
// import { MovieCard } from '../movie-card/movie-card';

// export class MainView extends React.Component {
//     constructor() {
//         super();
//         this.state= {
//             movies: [],
//             selectedMovie: null
//         };
//     }

//     componentDidMount(){
//         axios.get('https://nixflix-93.herokuapp.com/movies')
//             .then(response => {
//                 this.setState({
//                     movies: response.data
//                 });
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }

//     setSelectedMovie(newSelectedMovie) {
//         this.setState({
//             selectedMovie: newSelectedMovie
//         });
//     }

//     onLoggedIn(user) {
//         this.setState({
//             user
//         });
//     }

//     render() {
//         const { movies, selectedMovie } = this.state;

//         if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

//         if (movies.length === 0) return <div className="main-view" />;

//         return (
//             <div className="main-view">
//                 {selectedMovie
//                     ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />

//                     : movies.map(movie => (
//                         <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
//                     ))
//                 }
//             </div>
//         );
//     }
// }