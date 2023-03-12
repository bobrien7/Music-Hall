const mysql = require('mysql')
const config = require('./config.json')

let databaseRunning = 0;

if (databaseRunning){
  const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.pass,
    port: config.port,
    database: config.db
  });
  connection.connect((err) => err && console.log(err));
}

// routes here
const test = function (req, res) {
    res.send('response from express backend received!');
}

// GET /song/:song_id
const song = async function(req, res) {
  //console.log(req.params);
  cannedSong = {"songId":"123", "name":"Let It Be", "artistId":"1242"};
  res.send(cannedSong);
}

// GET /artist/:artist_id
const artist = async function(req, res) {
  //console.log(req.params);
  cannedArtist = {"artistId":"1234", "name":"The Beatles", "popularity":"99"};
  res.send(cannedArtist);
}

// GET /album/:album_id
const album = async function (req, res) {
  //console.log(req.params);
  cannedAlbum = {"albumId":"55", "name":"Abbey Road"};
  res.send(cannedAlbum);
}

// GET /concert/:concert_id
const concert = async function(req, res) {
  //console.log(req.params);
  cannedConcert = {"concertId":"777", 
                   "name":"The Beatles World Tour", 
                   "date":"3-10-1980",
                   "venue":"Madison Square Garden"};
  res.send(cannedConcert);
}

module.exports = {
    test,
    song,
    artist,
    album,
    concert
}
