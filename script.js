function myFunction() {
  document.getElementById("stable").style.display = "block";
}

function dropFunction(id) {
  if (id == 'mrate') {
    document.getElementById("text").innerHTML = "My Ratings";
  }
  else if (id == 'frate') {
    document.getElementById("text").innerHTML = "Friend Ratings";
  }
  else if (id == 'arate') {
    document.getElementById("text").innerHTML = "All User Ratings";
  }
  document.getElementById("ratings").style.display = "block";
}

function myFunction1() {
  document.getElementById("stable1").style.display = "block";
}

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = 0;
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