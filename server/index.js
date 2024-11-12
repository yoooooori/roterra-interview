const axios = require('axios').default;
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors())

const key = 'cbeb94420ef071adb732291efc7cd31c';

app.get('/', (req, res) => {
    res.send('Hello from our server!')
});

// helper function to get keyword search results from tmdb API
const getMovies = async (word) => {
    try {
        const result = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${word}&page=1&api_key=${key}`);
        console.log(result.data);
        return result.data
    } catch (e) {
        console.log(e)
    }
}

// route to get keyword movie search results using query params
app.get('/movies', async (req, res) => {
    try {
        console.log(`Searching: ${req.query.word}`);
        const response = await getMovies(req.query.word);
        res.send(response);
    } catch (e) {
        console.log(e);
    }
});

app.listen(8080, () => {
      console.log('server listening on port 8080')
});


