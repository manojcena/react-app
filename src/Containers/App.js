import React, { Component } from 'react';
import './App.css';
import MOVIE from '../Components/Movie/Movie';
import Button from '../Components/Button/Button';
import Section from '../Components/Section/section';
import * as lodash from 'lodash';
import ErrorBoundaries from '../Components/ErrorBoundaries/ErrorBoundaries'
class App extends Component {
  constructor() {
    super();
    this.textInput = React.createRef();
    this.state = {
      movies: [],
      searchBy: "TITLE",
      sortBy: "RELEASE DATE",
      moviesList: []
    }
  }
  componentDidMount() {
    this.getMoviesUsingApi();
  }
  getMoviesUsingApi = () => {
    fetch("https://reactjs-cdp.herokuapp.com/movies")
      .then(response => {
        return response.json();
      })
      .then(movies => {
        let movieList = movies.data.map(movie => {
          movie.date = new Date(movie.release_date).getTime();
          return movie;
        })
        this.setState({
          movies: lodash.sortBy(movieList, [function (movie) { return movie["date"] }]),
          moviesList: movieList
        });
      })
      .catch(error => {
        console.log(error);
      })
  }
  //Search movies by title or genres
  searchMovies = (type) => {
    if (type === "SEARCH")
      type = this.state.searchBy
    let movies = [...this.state.moviesList];
    let moviesListBasedOnSearch = movies.filter(movie => {
      console.log(movie.genres.join("").toLowerCase());
      if (type === "TITLE")
        return movie.title.toLowerCase().includes(this.textInput.current.value.toLowerCase());
      else
        return movie.genres.join("").toLowerCase().includes(this.textInput.current.value.toLowerCase());
    })
    console.log(moviesListBasedOnSearch);
    this.setState({
      movies: moviesListBasedOnSearch,
      searchBy: type
    });
    console.log(this.textInput.current.value);
  }

  updateMoviesBySort = (type) => {
    let sortFiled = (type === "TITLE") ? "title" : "date";
    this.setState({
      movies: lodash.sortBy(this.state.movies, [function (movie) { return movie[sortFiled] }]),
      sortBy: type
    });

  }

  render() {
    let searchSection = {
      type: "Search By",
      button1: "TITLE",
      button2: "GENRES",
      click: this.searchMovies,
      specificType: this.state.searchBy
    }
    let sortSection = {
      type: "Sort By",
      button1: "TITLE",
      button2: "RELEASE DATE",
      click: this.updateMoviesBySort,
      specificType: this.state.sortBy
    }
    return (
      <div className="App">
        <h4 className="text-color-white">netflixroulette</h4>
        <h1 className="text-color-white">FIND YOUR MOVIE</h1>
        <input ref={this.textInput} className="search" type="text" placeholder="search any movie" />
        <Button name="SEARCH" click={this.searchMovies} type="search-button button-color-red"></Button>
        <Section sectionDetails={searchSection}></Section>
        <div className="sort-section">
          <h3 className="text-color-white"> {this.state.movies.length} Movies Found</h3>
          <Section sectionDetails={sortSection}></Section>
        </div>
        <ErrorBoundaries>
          <div className="movie-collection">
            {this.state.movies.map(movie => <MOVIE key={movie.id} movieDetails={movie}></MOVIE>)}
          </div>
        </ErrorBoundaries>
      </div>
    );
  }
}

export default App;

/*

 { <h3 className="text-color-white">Search By
          <Button click={this.searchMovies} name="TITLE" type={this.state.searchBy === "TITLE" ? "button-color-red" : "button-color-hash"}></Button>
          <Button click={this.searchMovies} name="GENRES" type={this.state.searchBy === "GENRES" ? "button-color-red" : "button-color-hash"}></Button>
        </h3>

       {/* <h3 className="text-color-white">Sort By
           <Button click={this.updateMoviesBySort} name="TITLE" type={this.state.sortBy === "TITLE" ? "button-color-red" : "button-color-hash"}></Button>
            <Button click={this.updateMoviesBySort} name="RELEASE DATE" type={this.state.sortBy === "RELEASE DATE" ? "button-color-red" : "button-color-hash"}></Button>
          </h3> }} */