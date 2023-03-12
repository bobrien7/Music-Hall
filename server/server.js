const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

// routes here
app.get('/test', routes.test);
app.get('/song/:songId', routes.song);
app.get('/artist/:artistId', routes.artist);
app.get('/album/:albumId', routes.album)
app.get('/concert/:concertId', routes.concert);

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
