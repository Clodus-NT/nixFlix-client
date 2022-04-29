import React from 'react';
import {Button, Card, Container, Row, Col, FormControl, FormGroup, Form} from 'react-bootstrap';
import axios from 'axios';

import "./profile-view.scss";

export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: []
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    //Gotta make sure the user who is trying to update has a token
    getUser(token) {
        const Username = localStorage.getItem('user');

        axios.get(`https://nixflix-93.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.setState({
                Username: response.data.Username,
                // Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
                FavoriteMovies: response.data.FavoriteMovies
            });
        })
        .catch(function (error) {
            console.log(error)
        });
    }

    //Sends a PUT request to API and the response sets the state to update user info.
    //console.log message indicates success
    updateUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://nixflix-93.herokuapp.com/users/${Username}`, 
        {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday

        }, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Password,
                Birthday: response.data.Birthday
            });

            localStorage.setItem('user', this.state.Username);
            console.log("Profile has been updated!");
            window.open('/profile', '_self');
        });
    }

    //Sends a DELETE request to API and console.log message indicates success
    removeFavorite = (e, movies) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://nixflix-93.herokuapp.com/users/${Username}/movies/${movie._id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(() => {
            console.log("Movie has been removed from favorites");
            this.componentDidMount();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    //Sends DELETE request to API and console.log message indicates success
    removeUser() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.delete(`https://nixflix-93.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            //We wouldn't want them to have a token now would we?
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            console.log("Profile has been deleted")
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    setUsername(value) {
        this.setState({
            Username: value
        });
    }

    setPassword(value) {
        this.setState({
            Password: value
        });
    }

    setEmail(value) {
        this.setState({
            Email: value
        });
    }

    setBirthday(value) {
        this.setState({
            Birthday: value
        });
    }

    render() {
        const { movies } = this.props;
        const { FavoriteMovies, Username, Password, Email, Birthday } = this.state;

        // if (!Username && Username !== '') {
        //     return null;
        // }

        return (
            <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Your Profile</Card.Title>
                            {/* <Card.Text>All fields are required to update your information</Card.Text> */}
                            <Form
                                onSubmit={(e) => {
                                    this.updateUser(
                                        e,
                                        this.Username,
                                        this.Password,
                                        this.Email,
                                        this.Birthday
                                    )
                                }} >
                                {/* Username Form */}
                                <FormGroup>
                                    <Form.Label>Username</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="username"
                                        placeholder="Enter a new username"
                                        value={Username}
                                        onChange={(e) => this.setUsername(e.target.value || '')}
                                        required />
                                </FormGroup>

                                {/* Password Form */}
                                <FormGroup>
                                    <Form.Label>Password</Form.Label>
                                    <FormControl
                                        type="password"
                                        name="password"
                                        placeholder="Enter a new password"
                                        value={Password}
                                        onChange={(e) => this.setPassword(e.target.value)}
                                        required />
                                </FormGroup>

                                {/* Email Form */}
                                <FormGroup>
                                    <Form.Label>Email</Form.Label>
                                    <FormControl
                                        type="email"
                                        name="email"
                                        placeholder="Enter a new email"
                                        value={Email}
                                        onChange={(e) => this.setEmail(e.target.value)}
                                        required />
                                </FormGroup>

                                {/* Birthday Form */}
                                <FormGroup>
                                    <Form.Label>Birthday</Form.Label>
                                    <FormControl
                                        type="date"
                                        name="birthday"
                                        placeholder="Enter a new birthday"
                                        value={Birthday}
                                        onChange={(e) => this.setBirthday(e.target.value)}
                                        required />
                                </FormGroup>
                                <Button 
                                    variant="success"
                                    type="submit"
                                    onClick={this.updateUser}>
                                        Update User Info
                                </Button>
                                <Button 
                                    variant="secondary"
                                    onClick={() => this.removeUser()}>
                                        Delete Profile
                                </Button>
                            </Form>
                                
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {FavoriteMovies.length === 0 && (
                                <div>You haven't added any movies to your favorites list :(</div>
                            )}
                            <Row>
                                {FavoriteMovies.length > 0 && movies.map((movie) => {
                                    if (movie._id === FavoriteMovies.find((fav) => fav === movie._id)) {
                                        return (
                                            <Card className="favorite-movie" key={movie._id} >
                                                <Card.Img
                                                    className="favorite-movie-image"
                                                    variant="top"
                                                    src={movie.ImagePath}
                                                />
                                                <Card.Body>
                                                    <Card.Title className="movie-title">
                                                        {movie.Title}
                                                    </Card.Title>
                                                    <Button value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>
                                                        Remove from Favorites
                                                    </Button>
                                                    </Card.Body>
                                                </Card>
                                            );
                                        }
                                    })}
                                </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Container>
        )
    }
}