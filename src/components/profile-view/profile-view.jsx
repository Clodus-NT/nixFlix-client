import React from 'react';
import {Button, Card, Container, Row, Col, FormControl, FormGroup, Form} from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

import { setUser, editUser } from '../../actions/actions';

import "./profile-view.scss";
import { connect } from 'react-redux';

export class ProfileView extends React.Component {
    constructor() {
        super();

        // this.state = {
        //     Username: null,
        //     Password: null,
        //     Email: null,
        //     Birthday: null,
        //     FavoriteMovies: []
        // };
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
            this.props.editUser({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Password,
                Birthday: response.data.Birthday
            });

            localStorage.setItem('user', this.state.Username);
            alert("Profile has been updated!");
            window.open('/profile', '_self');
        });
    }

    //Sends a DELETE request to API and console.log message indicates success
    removeFavorite(e, movie) {
        e.preventDefault();
    
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
    
        axios
          .delete(
            `https://nix-flix-93.herokuapp.com/users/${username}/Movies/${movie}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(() => {
            console.log(`${movie.Title} was removed from your favorite`);
            window.open("/users/:username", "__self");
          })
          .catch((err) => {
            console.log(err);
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
        const { FavoriteMovies, Username, Password, Email, Birthday } = this.props;

        return (
            <Container>
            <Row>
                <Col>
                    <Card id="update-profile-card">
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
                                <br></br>
                                <Button 
                                    id="update-user-button"
                                    variant="primary"
                                    type="submit"
                                    onClick={this.updateUser}>
                                        Update User Info
                                </Button>
                                <Button 
                                    id="delete-profile-button"
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
                <Col id="fav-movie-card-col">
                    <Card>
                        
                        <Card.Body>
                            <Card.Title id="fav-movie-card-title">Your Favorite Movies</Card.Title>
                            {FavoriteMovies.length === 0 && (
                                <div>You haven't added any movies to your favorites list :(</div>
                            )}
                            <Row>
                                {FavoriteMovies.length > 0 && movies.map((movie) => {
                                    if (movie._id === FavoriteMovies.find((fav) => fav === movie._id)) {
                                        return (
                                            <Card id="fav-movie-card-card" key={movie._id}  className="mx-auto">
                                                <Card.Img
                                                    id="fav-movie-img"
                                                    className="favorite-movie-image"
                                                    variant="top"
                                                    src={movie.ImagePath}
                                                />
                                                <Card.Body>
                                                    <Card.Title className="movie-title">
                                                        {movie.Title}
                                                    </Card.Title>
                                                    <Button value={movie._id} onClick={(e) => this.removeFavorite(e, movie)}>
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

ProfileView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }).isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired
        }).isRequired,
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.bool.isRequired
    }).isRequired,
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.date,
        FavoriteMovies: PropTypes.arrayOf(PropTypes.arrayOf.shape({
            //Not sure how to do this
        }))
    }).isRequired
}

const mapStateToProps = (state) => {
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
        editUser: (user) => {
            dispatch(editUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);