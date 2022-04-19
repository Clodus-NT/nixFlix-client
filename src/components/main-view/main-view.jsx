import React from 'react';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state= {
            movies: [
                { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg'},
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'},
                { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg'}
              ],
            selectedMovie: null
        };
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (selectedMovie) return <MovieView movie={selectedMovie} />;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>

        return (
            <div className="main-view">
                <button onClick={() => {alert('Nice!')}}>Click me!</button>
                
                {movies.map(movie => <MovieCard key={movie._id} movie={movie}/>)}
            </div>
        );
    }
}