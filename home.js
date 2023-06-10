function randMovie {
    var length = movies.length;
    var rand = Math.floor(Math.random() * length);
    var title = movies[rand].title;
    var genre = movies[rand].genre;
    var year = movies[rand].year;
    var director = movies[rand].director;
    var rating = movies[rand].rating;
    document.getElementById("title").textContent = title;
    document.getElementById("genre").textContent = genre;
    document.getElementById("year").textContent = year;
    document.getElementById("director").textContent = director;
}