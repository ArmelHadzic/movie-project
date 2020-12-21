import React, { Component } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import MovieInfo from "./MovieInfo";
import { BASE_API_MOVIE_URL, IMAGE_URL,  API_KEY } from '../constants';

class Movie extends Component {
    constructor() {
        super();
        this.state = {
            movie: {},
            trailer: {},
            editMode: false
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        //Getting the movie
        var movieId = this.props.match.params.movieId;
        axios.get(BASE_API_MOVIE_URL + movieId + '?api_key=' + API_KEY)
            .then(res => {
                this.setState({
                    movie: res.data
                })
            })
        axios.get(BASE_API_MOVIE_URL + movieId + '/credits?api_key=' + API_KEY)
            .then(res => {
                this.setState({
                    credits: res.data
                })
            })
        axios.get(BASE_API_MOVIE_URL + movieId + '/videos?api_key=' + API_KEY)
            .then(res => {
                this.setState({
                    trailer: res.data.results[0] // getting only first trailer if more than one exists
                })
            })
    }

    editMovieHandler = (property, value) => {
        const movie = { ...this.state.movie };
        movie[property] = value;
        this.setState({movie: movie})
    }

    render() {
        return (
            <div className="movie-details">
                <div className="movie-trailer">
                    <ReactPlayer url={this.state.trailer.key ? "https://youtu.be/" + this.state.trailer.key : ''} />
                </div>
                <div className="movie-info">
                    <img src={IMAGE_URL + this.state.movie.poster_path} alt="" className="image" />
                    <MovieInfo movie={this.state.movie} editMode={this.state.editMode} editMovie={this.editMovieHandler}/>
                </div>
                <div>
                    <button onClick={() => {this.setState({ editMode: !this.state.editMode})}} className="button">Modify Movie Info</button>
                    <button onClick={() => this.props.exportData(JSON.stringify(this.state.movie), 'movie.json', 'application/json')} className="button">
                        Export Current Movie data into JSON file
                    </button>
                   
                </div>
            </div>
        )
    }
}

export default Movie;