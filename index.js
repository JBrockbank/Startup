const express = require('express');
const app = express();

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
