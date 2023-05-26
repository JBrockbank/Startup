class User {
    constructor(name, password) {
      this.name = name;
      this.password = password;
      this.friends = [];
      this.moviesRated = 0;
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
    constructor(userId, movieId, rating) {
      this.userId = userId;
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
