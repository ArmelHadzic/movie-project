import { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import GenresList from './components/GenresList';
import MovieCollection from './components/MovieCollection';
import Movie from './components/Movie'
import { Switch, Route, withRouter } from "react-router-dom";
import {
    BASE_API_URL,
    API_KEY,
    GENRE_API_URL,
    TOP_RATED_API_URL,
    SEARCH_API_URL,
    DISCOVER_MOVIE_API_URL
} from './constants';

class App extends Component {
    constructor() {
      super();
      this.state = {
          genres: [],
          movies: [],
          searchValue: ""
      };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        //Getting the genres
        axios.get(BASE_API_URL + GENRE_API_URL + '?api_key=' + API_KEY)
            .then(res => {
                this.setState({
                    genres: res.data.genres
                });
            })

        //Getting the list of movies
        axios.get( BASE_API_URL + TOP_RATED_API_URL + '?api_key=' + API_KEY)
            .then(res => {
                this.setState({
                    movies: res.data.results
                });
            })
    }

    searchValueHandler = (searchValue) => {
        this.setState({ searchValue: searchValue });
    }

    searchHandler = () => {
        this.props.history.push('/');
        var searchValue = this.state.searchValue;
        searchValue = searchValue.replace(" ", "+");
        axios.get(SEARCH_API_URL + searchValue + '&api_key=' + API_KEY)
            .then(res => {
                this.setState({
                    movies: res.data.results
                });
            })
    }

    movieCollectionHandler = (id) => {
        var apiLink = '';
        if(id) {
            apiLink = BASE_API_URL + DISCOVER_MOVIE_API_URL + '?api_key=' + API_KEY + '&with_genres=' + id;
        } else {
            apiLink = BASE_API_URL + TOP_RATED_API_URL + '?api_key=' + API_KEY;
        }
        
        axios.get(apiLink)
            .then(res => {
                this.setState({
                    movies: res.data.results
                });
            })
    }

    downloadCurrentData = (content, fileName, contentType) => {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    render() {
        return (
            <div>
                <Header 
                    searchValue={this.state.searchValue}
                    searchValueHandler={this.searchValueHandler} 
                    searchHandler = {this.searchHandler}  
                    getMovies={this.movieCollectionHandler}
                />
                <div className="content">
                    <GenresList genres={this.state.genres} getMovies={this.movieCollectionHandler}/>
                    <Switch>
                        <Route path={["/", "/genres/:genreName"]} exact 
                            render={() => <MovieCollection 
                                            movies={this.state.movies} 
                                            exportData={this.downloadCurrentData} />}
                        />
                        <Route path="/movies/:movieId" exact 
                            render={(props) => <Movie
                                                {...props} 
                                                exportData={this.downloadCurrentData}/>}
                        />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(App);
