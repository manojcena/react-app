import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBox from './SearchBox';
import MOVIE from './Movie';
import Button from './Button';
class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      searchBy:"title"
    }
  }
  componentWillMount() {
    this.getMoviesUsingApi();
  }
  getMoviesUsingApi = () => {
    fetch("https://reactjs-cdp.herokuapp.com/movies")
      .then(response => {
        return response.json();
      })
      .then(movies => {
        this.setState({
          movies: movies.data
        });
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    let movie = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    return (
      <div className="App">
        <h4 className="text-color-white">netflixroulette</h4>
        <h1 className="text-color-white">FIND YOUR MOVIE</h1>
        <SearchBox></SearchBox>        
        <Button name="SEARCH" type="search-button button-color-red"></Button>
        <h3 className="text-color-white">Search By <Button name="Title" type={this.state.searchBy=="title" ?"search-button button-color-red":"search-button button-color-hash"}></Button> <Button name="GENRES" type={this.state.searchBy!="title" ?"search-button button-color-red":"search-button button-color-hash"}></Button></h3>
        <div className="movie-collection">
          {this.state.movies.map(movie => <MOVIE key={movie.id} movieDetails={movie}></MOVIE>)}
        </div>


      </div>
    );
  }
}

export default App;
