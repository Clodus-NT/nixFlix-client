import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import './navbar.scss';

export function MenuBar({user}) {
    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }

    const isAuth = () => {
        if(typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    }

    return (
        <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand className="navbar-logo" href="/">nixFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                    {isAuth() && (
                        <Link to={`/users/${user}`}>{user}</Link>
                    )}
                    {isAuth() && (
                        <Button variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
                    )}
                    {!isAuth() && (
                        <Link to="/">Sign-In</Link>
                    )}
                    {!isAuth() && (
                        <Link to="/register">Sign-Up</Link>
                    )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user
    };
}

export default connect(mapStateToProps, { setUser })(MenuBar);