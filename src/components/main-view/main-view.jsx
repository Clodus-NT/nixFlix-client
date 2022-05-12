import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { 
    setMovies, 
    setUser,
    regUser,
    editUser,
    addFavMovie,
    remFavMovie
    } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';


import { MenuBar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
// import { MovieCard } from '../movie-card/movie-card';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view'; 
import { ProfileView } from '../profile-view/profile-view';
import { Container, Col, Row } from 'react-bootstrap';

import './main-view.scss';

class MainView extends React.Component {
    constructor() {
        super();
        this.state= {
            movies: [],
            user: null
        };
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            const { setUser } = this.props;
            setUser(localStorage.getItem('user'));

            // this.setState({
            //     user: localStorage.getItem('user')
            // });
            this.getMovies(accessToken);
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
            this.props.setMovies(response.data);
            //Assign result of state
        //     this.setState({
        //         movies: response.data
        //     });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    //On succesful login, function updates the user property in 
    //state to that user
    onLoggedIn(authData) {
        console.log(authData);
        // this.setState({
        //     user: authData.user.Username
        // });
        this.props.setUser(authData.user);

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
        // const { movies, user } = this.state;
        const { movies, user } = this.props;
        console.log('logged in: ', user);

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
                        return <MoviesList movies={movies}/>
                        // return movies.map(m => (
                        //     <Col md={3} key={m._id}>
                        //         <MovieCard movie={m} />
                        //     </Col>
                        // ))
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
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
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
                        //IF statement removed because it was causing issues with ProfileView
                        //  if (!user) return <Redirect to="/"
                        // />
                        return <Col>
                            <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
                </Container>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return { 
        movies: state.movies,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: (user) => {
            dispatch(setUser(user))
        },
        setMovies: (movies) => {
            dispatch(setMovies(movies))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
// export default connect(mapStateToProps, { setMovies, setUser })(MainView);