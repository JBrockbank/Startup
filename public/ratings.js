function myFunction() {
    document.getElementById("stable").style.display = "block";
    searchEl = document.getElementById("search");
    var searchName = searchEl.value;
    document.getElementById("smovie").textContent = searchName;
    console.log(searchName);
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
    CreateMovieTable();
  }

  function CreateMovieTable() {
    



    const user = JSON.parse(localStorage.getItem("user"));
    const table = document.getElementById("ratings");


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
      genreCell.textContent = movie.genre;
      yearCell.textContent = movie.year;
      directorCell.textContent = movie.director;
      ratingCell.textContent = movie.rating;
    });
  }

  function rateMovie() {
    const movieEl = document.querySelector("#smovie");
    const ratingEl = document.querySelector("#rating");
    const user = JSON.parse(window.localStorage.getItem("user"));
    const movie = new UserMovie(movieEl.textContent, ratingEl.value, user.name);
    user.moviesRated++;
    user.MovieList.push(movie);
    window.localStorage.setItem("user", JSON.stringify(user));
    submitRating(movie);
  }

  async function newestRating() {
    let newrating = false;
    try {
      const response = await fetch("/api/newrating", {
        method: "GET",
        headers: {'content-type': "application/json"},
        });
      newrating = await response.json();
      } catch {
        console.log("error");
      }
      return newrating;
    }

    async function submitRating(newrating) {
      try {
        const response = await fetch("/api/newrating", {
          method: "POST",
          headers: { 'Content-Type': "application/json" },
          body: JSON.stringify(newrating),
        });
        const updatedRating = await response.json();
        console.log("New rating:", updatedRating);
        return updatedRating; // Return the updated rating
      } catch (error) {
        console.log("Error:", error);
      }
    }


  
  // Call the CreateMovieTable function to populate the table initially

  

