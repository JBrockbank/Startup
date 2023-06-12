

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
    constructor(title, genre, year, rating, director) {
      this.title = title;
      this.genre = genre;
      this.year = year;
      this.director = director;
      this.rating = rating;
      this.movieId = 0;
    }
  }
  
  class UserMovie {
    constructor(movieId, rating, Name) {
      this.movieId = movieId;
      this.rating = rating;
      this.UserName = Name;
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


var user = JSON.parse(window.localStorage.getItem("user"));





const movies = [
  {
    title: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    director: "Frank Darabont",
    rating: "9.3/10"
  },
  {
    title: "The Godfather",
    genre: "Crime, Drama",
    year: 1972,
    director: "Francis Ford Coppola",
    rating: "9.2/10"
  },
  {
    title: "Pulp Fiction",
    genre: "Crime, Drama",
    year: 1994,
    director: "Quentin Tarantino",
    rating: "8.9/10"
  },
  {
    title: "The Dark Knight",
    genre: "Action, Crime, Drama",
    year: 2008,
    director: "Christopher Nolan",
    rating: "9.0/10"
  },
  {
    title: "Schindler's List",
    genre: "Biography, Drama, History",
    year: 1993,
    director: "Steven Spielberg",
    rating: "8.9/10"
  },
  {
    title: "Fight Club",
    genre: "Drama",
    year: 1999,
    director: "David Fincher",
    rating: "8.8/10"
  },
  {
    title: "Forrest Gump",
    genre: "Drama, Romance",
    year: 1994,
    director: "Robert Zemeckis",
    rating: "8.8/10"
  },
  {
    title: "Inception",
    genre: "Action, Adventure, Sci-Fi",
    year: 2010,
    director: "Christopher Nolan",
    rating: "8.7/10"
  },
  {
    title: "The Matrix",
    genre: "Action, Sci-Fi",
    year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    rating: "8.7/10"
  },
  {
    title: "Goodfellas",
    genre: "Biography, Crime, Drama",
    year: 1990,
    director: "Martin Scorsese",
    rating: "8.7/10"
  }
];
