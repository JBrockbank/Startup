const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');


  // Connect to the database cluster
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('MovieDB');
const collection = db.collection('Movies');
const UserCollection = db.collection('Users');
const UserMovieCollection3 = db.collection('UserMovies');

  // Test that you can connect to the database
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });


  class User {
    constructor(name, password) {
      this.name = name;
      this.password = password;
      this.friends = [];
      this.moviesRated = 0;
      this.Id;
    }
  }

  class UserMovie {
    constructor(movieId, rating, Name) {
      this.movieId = movieId;
      this.rating = rating;
      this.UserName = Name;
    }
  }

  // Query the documents
async function movieQueryByTitle(title) {
    const query = {title: {$regex: title, $options: 'i'}};
    const options = {
        sort: { score: -1 },
        limit: 10,
        };
    let movies = await collection.find(query, options).toArray();
        if(movies == {}) {
            console.log("Movie not found");
            return false;
        }
        else {
            console.log("Movies found");
            return movies;
        }
}

async function movieQueryByID(id) {
    console.log("movieQueryByID called");
    const query = {id: id};
    let movie = await collection.findOne(query);
    return movie;
}

async function findMovieID(title) {
    const query = {title: title};
    let movie = await collection.findOne(query);
    return movie.id;
}

async function rateUserMovie(movieTitle, rating, UserName) {
    console.log("rateUserMovie called");
    const movieId = await findMovieID(movieTitle);
    const userMovie = new UserMovie(movieId, rating, UserName);
    const query = {movieId: userMovie.movieId, UserName: userMovie.UserName};
    indicator = false;
    if (await UserMovieCollection3.findOne(query) == null) {
        const cursor = await UserMovieCollection3.insertOne(userMovie);
        const indicator = true;
    } else {
        const cursor = await UserMovieCollection3.updateOne(query, {$set: {rating: userMovie.rating}});
        const indicator = true;
    }
    let newQuery = {movieId: movieId};
    console.log("newQuery: ");
    console.log(newQuery);
    const movies = await UserMovieCollection3.find(newQuery).toArray();
    console.log("Movies: ");
    console.log(movies);
    let Newrating = 0;
    for (let i = 0; i < movies.length; i++) {
        Newrating += Number(movies[i].rating);
        console.log("Newrating: ");
        console.log(Newrating);
    }
    var Avgrating = Newrating / movies.length;
    console.log("Movies.length: ");
    console.log(movies.length);
    console.log("Avgrating: ");
    console.log(Avgrating);
    Avgrating = Avgrating.toFixed(2);
    const cursor2 = await collection.updateOne({id: movieId}, {$set: {rating: Avgrating}});
    console.log(movieTitle + " rated " + rating + " by " + UserName);
    return indicator;
}

async function AddUser(name, password) {
    const user = new User(name, password);
    const query = {name: user.name};
    console.log("Search Returned: ");
    console.log(await UserCollection.findOne(query));
    if(await UserCollection.findOne(query) !== null) {
    console.log("Username already exists");
        return false;
    }
    else {
        const cursor = await UserCollection.insertOne(user);
        console.log("User added");
        return true;
    }
}

// async function searchFriends(name) {
//     const query = {name: {$regex: name, $options: 'i'}};
//     const users = await UserCollection.find(query).toArray();
//     return users;
// }

async function Login(name, password) {
    const query = {name: name, password: password};
    const user = await UserCollection.findOne(query);
    if(user == null) {
        console.log("Username/Password don't match");
        return false;
    }
    if(user.name == name && user.password == password) {
        console.log("User verified");
        return true;
    }
    else {
        console.log("Username/Password don't match");
            return false;
    }
}


async function getUserByName(name) {
    const query = {name: name};
    const user = await UserCollection.findOne(query);
    return user;
}

async function getMovies() {
    const cursor = collection.find({}).sort({rating: -1});
    const movies = await cursor.toArray();
    return movies;
}

async function getUserMovies(name) {
    console.log("DB.getUserMovies called")
    const query = {UserName: name};
    const options = {
        sort: { score: -1 },
        };
    const movies= await UserMovieCollection3.find(query, options).toArray();
    return movies;
}

// async function getFriends(name) {
//     const query = {UserName: name};
//     const user = await UserCollection.findOne(query);
//     const friends = user.friends;
//     return friends;
// }

// async function getFriendsMovies(name) {
//     const friends = await getFriends(name);
//     const movies = [];
//     for (let i = 0; i < friends.length; i++) {
//         const query = {UserName: friends[i]};
//         const userMovies = await UserMovieCollection3.find(query).toArray();
//         for (let j = 0; j < userMovies.length; j++) {
//             movies.push(userMovies[j].id);
//         }
//     }
//     for (let i = 0; i < movies.length; i++) {
//         const query = {id: movies[i]};
//         const movies = await collection.find(query).toArray();
//     }
//     return movies;
// }



async function randMovie() {
    console.log("randMovie called");
    const length = await collection.countDocuments({})
    const index = Math.floor(Math.random() * length)
    const query = {id: index};
    let movie = await collection.findOne(query);
    console.log("Movie: ");
    console.log(movie);
    return movie;
}


// const query = {title: "Stardust"};
// const options = {
//   sort: { score: -1 },
//   limit: 10,
// };

// const cursor = collection.find(query, options);
// const movies = await cursor.toArray();
// movies.forEach((i) => console.log(i.title));





module.exports = { movieQueryByTitle, movieQueryByID, rateUserMovie, AddUser, randMovie, Login, getMovies, getUserMovies, findMovieID, getUserByName };