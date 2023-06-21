
  



  // function CreateMovieTable() {
    



  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const table = document.getElementById("ratings");


  //   const headerRow = table.insertRow();
  //   const titleHeader = headerRow.insertCell();
  //   const genreHeader = headerRow.insertCell();
  //   const yearHeader = headerRow.insertCell();
  //   const directorHeader = headerRow.insertCell();
  //   const ratingHeader = headerRow.insertCell();
  
  //   titleHeader.textContent = "Title";
  //   genreHeader.textContent = "Genre";
  //   yearHeader.textContent = "Year";
  //   directorHeader.textContent = "Director";
  //   ratingHeader.textContent = "Rating";
  
  //   movies.forEach((movie) => {
  //     const row = table.insertRow();
  //     const titleCell = row.insertCell();
  //     const genreCell = row.insertCell();
  //     const yearCell = row.insertCell();
  //     const directorCell = row.insertCell();
  //     const ratingCell = row.insertCell();
  
  //     titleCell.textContent = movie.title;
  //     genreCell.textContent = movie.genre;
  //     yearCell.textContent = movie.year;
  //     directorCell.textContent = movie.director;
  //     ratingCell.textContent = movie.rating;
  //   });
  // }

  // CreateMovieTable();



  async function newestRating() {
    let newrating = {};
    try {
      const response = await fetch("/api/newrating", {
        method: "GET",
        headers: {'content-type': "application/json"},
        });
      newrating = await response.json();
      } catch {
        console.log("error");
      }
      console.log("newrating:", newrating);
      return newrating;
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


    
    

  

