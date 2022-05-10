import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { MenuBar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view'; 
import { ProfileView } from '../profile-view/profile-view';
import { Container, Col, Row } from 'react-bootstrap';

import './main-view.scss';


export class MainView extends React.Component {
    constructor() {
        super();
        this.state= {
            movies: [],
            user: null,
            fullUser: {}
        };
    }

    componentDidMount(){
        const accessToken = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (accessToken !== null) {
            axios.get(`https://nixflix-93.herokuapp.com/users/${user}`, {
                headers: { Authorization: `Bearer ${accessToken}`}
            })
            .then(res => {
                const fullUser = res.data;
                this.setState({
                    fullUser: fullUser,
                    user: localStorage.getItem('user')
                })
                this.getMovies(accessToken);
            })
            .catch(function (error) {
                console.log(error)
            });
        }
    }

    //When a movie is clicked, function is invoked and updates
    //the state of the selectedMovie property to that movie
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    getMovies(token) {
        axios.get('https://nixflix-93.herokuapp.com/movies', {
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

    //User logout
    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        if (!this.state) return <>loading</>

        const { movies, user } = this.state;

        //If no user, render LoginView
        //If there is a user logged in, user details are passed
        //as a prop to LoginView
        // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        //Before movies have been loaded
        // if (movies.length === 0) return <div className="main-view" />;

        return (
            <Router>
                <MenuBar user={user} />
                <Container>
                <Row className="main-view justify-content-md-center">
                        {/* Login */}
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />
                        {/* RegistrationView */}
                    <Route path="/register" render={() => {
                        if(user) {
                            <Redirect to="/" />
                        }
                        return (
                            <Col lg={8} md={8}>
                                <RegistrationView />
                            </Col>
                        )
                    }} />
                        {/* MovieView */}
                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        return <Col md={8}>
                            <MovieView user={this.state?.fullUser} movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                        {/* DirectorView */}
                    <Route path="/directors/:name" render={( { match, history }) => {

                        if (!user) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

                        return ( 
                            <Col md={8} >
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.name)?.Director} onBackClick={() => history.goBack()} />
                            </Col>
                        )
                    }} />
                        {/* GenreView */}
                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name)?.Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                        {/* ProfileView */}
                    <Route path={`/users/${user}`} render={({ history }) => {
                        if (!user) return <Redirect to="/" />
                        return <Col>
                            <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                            {/* <ProfileView profile={users.find(p => p.User.Username === match.params.name)?.Users} onBackClick={() => history.goBack()} /> */}
                        </Col>
                    }} />
                </Row>
                </Container>
            </Router>
        );
    }
}