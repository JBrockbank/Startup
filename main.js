class User {
    constructor(name, password) {
      this.name = name;
      this.password = password;
      const x = fetch("http://localhost:8080/users/getAll")
      this.id = x.length + 1;
      this.friends = [];
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
    fetch("http://localhost:8080/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("userId", data.id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }