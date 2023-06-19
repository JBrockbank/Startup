

// class User {
//     constructor(name, password) {
//       this.name = name;
//       this.password = password;
//       this.friends = [];
//       this.moviesRated = 0;
//       this.Id;
//       this.MovieList = [];
//     }
//   }

  
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
  


  
function RandomMovie() {
  let movie = randMovie();
  document.getElementById("title").textContent = "Title: " + movie.title;
  document.getElementById("genre").textContent = "Genre: " + movie.genre;
  document.getElementById("year").textContent = "Year Released: " + movie.year;
  document.getElementById("director").textContent = "Director: " + movie.director;
  // document.getElementById("rating").textContent = "Rating: " + rating;
  return movie;
}

function CreateMovieTable(movies, ELid) {
  const table = document.getElementById(ELid);
  table.innerHTML = "";
  
  const headerRow = table.insertRow();
  const titleHeader = headerRow.insertCell();
  const genreHeader = headerRow.insertCell();
  const yearHeader = headerRow.insertCell();
  const directorHeader = headerRow.insertCell();
  const ratingHeader = headerRow.insertCell();

  titleHeader.textContent = "Title";
  genreHeader.textContent = "Genre";
  yearHeader.textContent = "Year";
  directorHeader.textContent = "Director";
  ratingHeader.textContent = "Rating";

  movies.forEach((movie) => {
    const row = table.insertRow();
    const titleCell = row.insertCell();
    const genreCell = row.insertCell();
    const yearCell = row.insertCell();
    const directorCell = row.insertCell();
    const ratingCell = row.insertCell();

    titleCell.textContent = movie.title;
    genreCell.textContent = movie.genres;
    yearCell.textContent = movie.year;
    directorCell.textContent = movie.director;
    const ratingHTML = "<input id='rating' type='number' placeholder='0' name='rating' min='1' max='10'></input> <button onclick='rateMovie(this.parentNode.parentNode)' type='submit' class='btn btn-danger'>Submit</button>";
    ratingCell.innerHTML = ratingHTML;
    });
  console.log("Table Created");
  console.log(table);
}

async function getMovieId(title) {
  try {
    const response = await fetch("/api/movie/search", {
      method: "POST",
      body: JSON.stringify({ title: title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const movieID = await response.json();
    console.log(movieID);
    return movieID;
  } catch {
    console.log("error");
  }
}


async function submitRating(movieName, rating, userName) {

const movieId = await getMovieId(movieName);

  try {
    const ratingData = {
      movieId: movieId,
      rating: rating,
      UserName: userName
    };
    console.log("ratingData:", ratingData);
    
    const response = await fetch("/api/newrating", {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(ratingData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit rating");
    }

    const updatedRating = await response.json();
    console.log("New rating:", updatedRating);
    updateNewestRating();
    return updatedRating;
  } catch (error) {
    console.log("Error:", error);
  }
}


async function rateMovie(row) {
  const movieEl = row.querySelector("td:nth-child(1)").textContent;
  const ratingEl = row.querySelector("td:nth-child(5) input").value;
  const name = localStorage.getItem("userName");
  console.log(movieEl);
  console.log(ratingEl);
  console.log(name);


try {

  const response = await fetch("/api/movies/rating", {
    method: "POST",
    body: JSON.stringify({ movieId: movieEl, rating: ratingEl, userName: name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  submitRating(movieEl, ratingEl, name);
} catch {
  console.log("error");
}
}


async function register() {
    user = JSON.parse(window.localStorage.getItem("user"));
    const nameEl = document.querySelector("#name");
    const passwordEl = document.querySelector("#password");

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify({ name: nameEl.value, password: passwordEl.value }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const verified = await response.json();
      console.log(verified); // Verify the response from the server
      if(verified) {
        window.location.href = "/home.html";
        window.localStorage.setItem("userName", nameEl.value);
      }
      else {
        console.log("Registration failed"); // Handle login failure
      }
    } catch {
      console.log("error");
    }
}

async function login() {
  const nameEl = document.querySelector("#name");
  const passwordEl = document.querySelector("#password");

  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ name: nameEl.value, password: passwordEl.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const verified = await response.json();
    console.log(verified); // Verify the response from the server

    if (verified) {
      window.location.href = "/home.html";
      window.localStorage.setItem("userName", nameEl.value);
    } else {
      console.log("Login failed"); // Handle login failure
    }
  } catch (error) {
    console.log("Login API error:", error); // Log the error for debugging
  }
}


async function getMovies() {
  try {
    const response = await fetch("/api/movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const movies = await response.json();
    console.log(movies);
    return movies;
  } catch {
    console.log("error");
  }
}




async function getFriends(user) {

  try {
    const response = await fetch("/api/user/friends", {
      method: "POST",
      body: JSON.stringify({ name: user }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const friends = await response.json();
    console.log(friends);
    return friends;
  } catch {
    console.log("error");
  }
}


async function getFriendsMovies(user) {

  try {
    const response = await fetch("/api/user/friends/movies", {
      method: "POST",
      body: JSON.stringify({ name: user }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const friendsMovies = await response.json();
    console.log(friends);
    return friendsMovies;
  } catch {
    console.log("error");
  }
}



async function getUserMovies(user) {
  
  try {
    const response = await fetch("/api/user/movies", {
      method: "POST",
      body: JSON.stringify({ name: user }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const movies = await response.json();
    console.log(movies);
    return movies;
  } catch {
    console.log("error");
  }
}




async function dropFunction(id) {
  const who = JSON.parse(localStorage.getItem("userName"));
  if (id == 'mrate') {
    document.getElementById("text").innerHTML = "My Ratings";
    who = userName;
  }
  else if (id == 'frate') {
    document.getElementById("text").innerHTML = "Friend Ratings";
    who = "friends";
  }
  else if (id == 'arate') {
    document.getElementById("text").innerHTML = "All User Ratings";
    who = "all";
  }
  document.getElementById("ratings").style.display = "block";
  if (who == "friends") {
    console.log("friendsTable")
    const movies = await getFriendsMovies(who);
  }
  else {
    console.log(who + "Table");
    const movies = await getUserMovies(who);
  }
  CreateMovieTable(movies, "ratings");
}


async function searchFunction() {
  const movies = await MovieSearch();
  console.log("HERE")
  console.log(movies);
  CreateMovieTable(movies, "stable");
}

async function MovieSearch() {
  const title = document.getElementById("search").value;
  console.log(title);
  try {
    const response = await fetch("/api/movies/search", {
      method: "POST",
      body: JSON.stringify({ title: title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const movies = await response.json();
    console.log(movies);
    return movies;
  } catch {
    console.log("error");
  }
}





  function getPassword() {
    return localStorage.getItem("password");
  }

  function createUser(nameEl, passwordEl) {
    const user = new User(nameEl.value, passwordEl.value);
    window.localStorage.setItem("user", JSON.stringify(user))
  }





