

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
  


  async function RandomMovie() {
    try {
  
      const response = await fetch('/api/movies/random', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
      });
      const movie = await response.json();
      console.log("movie:", movie);
      // const rating = movie.rating;
      // console.log("rating:", rating);
      // return rating;
      document.getElementById("title").textContent = "Title: " + movie.title;
      for(let i = 0; i < movie.genres.length; i++) {
        if(i == 0) {
          document.getElementById("genre").textContent = "Genre: " + movie.genres[i];
        }
        else {
          document.getElementById("genre").textContent += ", " + movie.genres[i];
        }
      }
      document.getElementById("year").textContent = "Year Released: " + movie.year;
      document.getElementById("director").textContent = "Director: " + movie.director;
      if(movie.rating == undefined) {
        document.getElementById("rating").textContent = "Rating: " + "Not Rated";
      }
      else {
      document.getElementById("rating").textContent = "Rating: " + movie.rating;
      }
      document.getElementById("img1").innerHTML = "<img src='" + movie.posterUrl + "' alt='Movie Poster' width='200' height='300'>";
      } catch {
        console.log("error");
    }
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



function CreateMovieTable2(movies, ELid) {
  console.log("CreateMovieTable2 called");
  console.log(movies);
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
    ratingCell.textContent = movie.rating;
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
      options: {
        sort: { rating: -1 },
      },
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




// async function getFriends(user) {

//   try {
//     const response = await fetch("/api/user/friends", {
//       method: "POST",
//       body: JSON.stringify({ name: user }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const friends = await response.json();
//     console.log(friends);
//     return friends;
//   } catch {
//     console.log("error");
//   }
// }


// async function getFriendsMovies(user) {

//   try {
//     const response = await fetch("/api/user/friends/movies", {
//       method: "POST",
//       body: JSON.stringify({ name: user }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const friendsMovies = await response.json();
//     console.log(friends);
//     return friendsMovies;
//   } catch {
//     console.log("error");
//   }
// }



async function getUserMovies(user) {
  console.log("getUserMovies called")
  console.log(user);
  try {
    const response = await fetch("/api/user/movie", {
      method: "POST",
      body: JSON.stringify({ name: user }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const movies = await response.json();
    console.log(movies);
    let movieIDList = [];
    for (let i = 0; i < movies.length; i++) {
      movieIDList.push(movies[i].movieId);
    }
    console.log(movieIDList);
    let movieList = [];
    for (let i = 0; i < movieIDList.length; i++) {
      const response = await fetch("/api/movie/find", {
        method: "POST",
        body: JSON.stringify({ movieId: movieIDList[i] }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response")
      console.log(response)
      const movie = await response.json();
      console.log(movie);
      movieList.push(movie);
    }
    console.log(movieList);
    for (let i = 0; i < movies.length; i++) {
      movieList[i].rating = movies[i].rating;
    }
    return movieList;
  } catch {
    console.log("error");
  }
}


async function numMoviesRated() {
  console.log("numMoviesRated called")
  const userName = localStorage.getItem("userName");
  const movies = await getUserMovies(userName);
  const numMoviesRated = movies.length;
  console.log("numMoviesRated:", numMoviesRated);
  console.log(numMoviesRated);
  return numMoviesRated;
}
  


async function dropFunction(id) {
  console.log("dropFunction called")
  const userName = localStorage.getItem("userName");
  var movies = {};
  if (id == 'mrate') {
    document.getElementById("text").innerHTML = "My Ratings";
    who = userName;
    console.log("My Ratings")
  }
  // else if (id == 'frate') {
  //   document.getElementById("text").innerHTML = "Friend Ratings";
  //   who = "friends";
  // }
  else if (id == 'arate') {
    document.getElementById("text").innerHTML = "All User Ratings";
    who = "all";
  }
  document.getElementById("ratings").style.display = "block";
  // if (who == "friends") {
  //   console.log("friendsTable")
  //   movies = await getFriendsMovies(who);
  //   console.log(movies);
  // }
  if (who == userName) {
    console.log(who + "Table");
    movies = await getUserMovies(who);
    console.log(movies);
  }
  else if (who == "all") {
    console.log("allTable");
    movies = await getMovies();
    console.log(movies);
  }

  if (movies == {}) {
    console.log("No movies found");
    return false;
  }
  console.log(movies);
  CreateMovieTable2(movies, "ratings");
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


// async function friendSearch() {
//   document.getElementById("stable1").style.display = "block";
//   searchEl = document.getElementById("searchInput");
//   var searchName = searchEl.value;

//   try {
//     const response = await fetch("/api/user/friends/search", {
//       method: "POST",
//       body: JSON.stringify({ name: searchName }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const friends = await response.json();
//     console.log(friends);
//     return friends;
//   }
//   catch {
//     console.log("error");
//   }
// }


// async function createFriendsTable() {
//   // Retrieve the User object from local storage
//   const user = localStorage.getItem("userName");

//   // Get the table element by its ID
//   const table = document.getElementById("friendsTable");

//   // Clear the table body before adding new rows
//   table.innerHTML = "";

//   // Create table header row
//   const headerRow = table.insertRow();
//   const usernameHeader = headerRow.insertCell();
//   const moviesRatedHeader = headerRow.insertCell();
//   usernameHeader.textContent = "Username";
//   moviesRatedHeader.textContent = "Movies Rated";

//   // Create table rows for each friend
//   const friends = await getFriends(user);
//   for (let i = 0; i < friends.length; i++) {
//     const row = table.insertRow();
//     const usernameCell = row.insertCell();
//     const moviesRatedCell = row.insertCell();
//     usernameCell.textContent = friends[i];
//     const movies = await getUserMovies(friends[i]);
//     moviesRatedCell.textContent = movies.length;
//   }
// }

async function getMovieById(id) {
  console.log("getMovieById called")
  try {
    const response = await fetch("/api/movie/find", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const movie = await response.json();
    console.log(movie);
    return movie;
  } catch {
    console.log("error");
  }
}
  



async function updateNewestRating() {
  console.log("updateNewestRating called")
  const newrating = await newestRating();
  console.log("newrating:", newrating);
  const id = newrating.movieId;
  console.log("id:", id);
  const movie = await getMovieById(id);
  const title = movie.title;
  if (newrating) {
    document.getElementById("newestRating").textContent = `${title} gave ${newrating.movieId} a rating of ${newrating.rating}`;
  }
}


function getPassword() {
    return localStorage.getItem("password");
}

function createUser(nameEl, passwordEl) {
    const user = new User(nameEl.value, passwordEl.value);
    window.localStorage.setItem("user", JSON.stringify(user))
}




