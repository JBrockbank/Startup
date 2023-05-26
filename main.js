

class User {
    constructor(name, password) {
      this.name = name;
      this.password = password;
      this.friends = [];
      this.moviesRated = 0;
      this.Id;
      this.MovieList = [];
    }
  }
  
  class Movie {
    constructor(title, genre, year, rating) {
      this.title = title;
      this.genre = genre;
      this.year = year;
      this.rating = rating;
      this.movieId = 0;
    }
  }
  
  class UserMovie {
    constructor(movieId, rating) {
      this.movieId = movieId;
      this.rating = rating;
    }
  }
  


  function getUsername() {
    return localStorage.getItem("userName");
  }
  
  function getPassword() {
    return localStorage.getItem("password");
  }

  function createUser(nameEl, passwordEl) {
    const user = new User(nameEl.value, passwordEl.value);
    window.localStorage.setItem("user", JSON.stringify(user))
  }

function rateMovie() {
  const movieEl = document.querySelector("#smovie");
  const ratingEl = document.querySelector("#rating");
  const user = JSON.parse(window.localStorage.getItem("user"));
  const movie = new UserMovie(movieEl.textContent, ratingEl.value);
  user.moviesRated++;
  user.MovieList.push(movie);
  window.localStorage.setItem("user", JSON.stringify(user));
}

var user = JSON.parse(window.localStorage.getItem("user"));