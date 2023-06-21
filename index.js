const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production, the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter); // Add a forward slash before 'api'

// Initialize newrating variable
let newrating = {};

updateNewRating = (rating, newrating) => {
    if (rating && typeof rating === 'object' && 'movieId' in rating) {
      newrating.movieId = rating.movieId;
      newrating.rating = rating.rating;
      newrating.UserName = rating.UserName;
    }
    return newrating;
  };
  


// Get New Rating
apiRouter.get('/newrating', (_req, res) => {
    res.json(newrating || {});
});

apiRouter.post('/movieRating', async (req, res) => {
    const movieId = req.body.movieId;
    const rating = req.body.rating;
    const UserName = req.body.UserName;
    const result = await DB.rateUserMovie(movieId, rating, UserName);
    res.json(result);
});

apiRouter.post('/user/register', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const result = await DB.AddUser(name, password);
    res.json(result);
});

apiRouter.post('/user/login', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const result = await DB.Login(name, password);
    res.json(result);
});

apiRouter.get('/movies', async (_req, res) => {
    const movies = await DB.getMovies();
    res.json(movies);
});

apiRouter.post('/movies/search', async (req, res) => {
    const title = req.body.title;
    console.log(title);
    const result = await DB.movieQueryByTitle(title);
    res.json(result);
});

apiRouter.post('/movie/search', async (req, res) => {
    console.log("API ROUTER MOVIE SEARCH")
    const title = req.body.title;
    const result = await DB.findMovieID(title);
    res.json(result);
    });
    

apiRouter.get('/user/movies', async (req, res) => {
    const name = req.body.name;
    const result = await DB.getUserMovies(name);
    res.json(result);
});

apiRouter.post('/user/movie', async (req, res) => {
    console.log("API ROUTER USER MOVIES")
    const name = req.body.name;
    const result = await DB.getUserMovies(name);
    res.json(result);
});

apiRouter.post('/movies/random', async (_req, res) => {
    console.log("API ROUTER MOVIES RANDOM")
    const movie = await DB.randMovie();
    console.log(movie);
    res.json(movie);
});

// apiRouter.post('/user/friends', async (req, res) => {
//     const name = req.body.name;
//     const result = await DB.getFriends(name);
//     res.json(result);
// });

// apiRouter.post('/user/friends/search', async (req, res) => {
//     const name = req.body.name;
//     const result = await DB.seachFriends(name);
//     res.json(result);
// });

// apiRouter.post('/user/friends/movies', async (req, res) => {
//     const name = req.body.name;
//     const result = await DB.getFriendsMovies(name);
//     res.json(result);
// });

apiRouter.post('/movie', async (req, res) => {
    const id = req.body.movieId;
    const result = await DB.movieQueryByID(id);
    res.json(result);
});

apiRouter.get('/movies/search', async (req, res) => {
    const title = req.body.title;
    const result = await DB.findMovieID(title);
    res.json(result);
});



apiRouter.post('/movies/rating', async (req, res) => {
    console.log("HERE")
    const movieId = req.body.movieId;
    const rating = req.body.rating;
    const userName = req.body.userName;
    const result = await DB.rateUserMovie(movieId, rating, userName);
    res.json(result);
});

apiRouter.post('/newrating', (req, res) => {
    newrating = updateNewRating(req.body, newrating);
    JSON.stringify(newrating);
    res.json(newrating);
});


/// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});