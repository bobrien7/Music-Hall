const mysql = require('mysql')
const config = require('./config.json')

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.pass,
  port: config.port,
  database: config.db
});
connection.connect((err) => err && console.log(err));

// routes here
const test = function (req, res) {
    res.send('response from express backend received!');
}

// GET /song/:song_id
const song = async function(req, res) {
  console.log(req.params);
  //cannedSong = {"songId":"123", "name":"Let It Be", "artistId":"1242"};
  connection.query(`
    SELECT *
    FROM Tracks
    LIMIT 1
  `, (err, data) => {
    if (err || data.length === 0) {
      // if there is an error for some reason, or if the query is empty (this should not be possible)
      // print the error message and return an empty object instead
      console.log(err);
      res.json({});
    } else {
      // Here, we return results of the query as an object, keeping only relevant data
      // being song_id and title which you will add. In this case, there is only one song
      // so we just directly access the first element of the query results array (data)
      // TODO (TASK 3): also return the song title in the response
      const tracks = [];
      for (var i=0; i < data.length; i++) {
        tracks.push(data[i]);
        console.log(data[i]);
      }
      res.send(tracks);
    }
  });
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

// GET /concertsearch/?search="United States"
const concertsearch = async function(req, res) {
  console.log(req.query);
  const query = `
  SELECT
    v.name                          AS venue_name, 
    v.location                      AS venue_location, 
    COUNT(DISTINCT c.concert_id)    AS number_of_concerts
  FROM Concerts c
  JOIN Venue v
    ON c.venue_id = v.venue_id
  WHERE (v.name LIKE '%${req.query.search}%') OR 
        (v.location LIKE '%${req.query.search}%')
  GROUP BY v.venue_id
  ORDER BY number_of_concerts DESC`

  connection.query(query,
    (err, data) => {
      if (err || data.length === 0){
        console.log(err);
        res.json({});
      }
      else{
        let concerts = [];
        for (var i = 0; i < data.length; i++){
          concerts.push(data[i]);
          console.log(data[i]);
        }
        res.json(concerts);
      }
    })
}

// GET /creatorsearch/?search="Blues Brothers"
const creatorsearch = async function(req, res) {
  console.log(req.query);
  const query = `
  SELECT
    cr.name                       AS creator_name, 
    cr.popularity                 AS creator_popularity, 
    COUNT(DISTINCT co.concert_id) AS count_of_concerts
  FROM Concerts co    
  JOIN Creators cr
    ON co.creators_id = cr.creator_id
  WHERE (cr.name LIKE '%${req.query.search}%')
  GROUP BY cr.creator_id;`

  connection.query(query,
    (err, data) => {
      if (err || data.length === 0){
        console.log(err);
        res.json({});
      }
      else{
        let creators = [];
        for (var i = 0; i < data.length; i++){
          creators.push(data[i]);
          console.log(data[i]);
        }
        res.json(creators);
      }
    })
}

// GET /venuetopcreator/
const venuetopcreator = async function(req, res) {
  console.log(req.params);
  const query = `
  SELECT
    co.concert      AS concert_name,
    cr.name         AS creator_name, 
    cr.popularity   AS creator_popularity, 
    COUNT(cr.name)  AS count_of_concerts
  FROM Creators cr
  JOIN Concerts co
    ON cr.creator_id = co.creators_id
  JOIN Venue v
    ON co.venue_id = v.venue_id
  WHERE (v.venue_id = ${req.params.venue_id})
  GROUP BY cr.name
  ORDER BY count_of_concerts DESC`

  connection.query(query,
    (err, data) => {
      if (err || data.length === 0){
        console.log(err);
        res.json({});
      }
      else{
        let top_creators = [];
        for (var i = 0; i < data.length; i++){
          top_creators.push(data[i]);
          console.log(data[i]);
          top_creators[i].rank = i
        }
        res.json(top_creators);
      }
    })
}

// GET /recentconcert
const recentconcert = async function(req, res) {
  console.log(req.params);
  const query = `
  SELECT
    cr.name,
    co.concert,
    co.date
  FROM Creators cr
  JOIN Concerts co
    ON cr.creator_id = co.creators_id
  JOIN Venue v
    ON co.venue_id = v.venue_id
  WHERE (v.venue_id = ${req.params.venue_id})
  ORDER BY co.date DESC;`

  connection.query(query,
    (err, data) => {
      if (err || data.length === 0){
        console.log(err);
        res.json({});
      }
      else{
        let recent_concerts = [];
        for (var i = 0; i < data.length; i++){
          recent_concerts.push(data[i]);
          console.log(data[i]);
        }
        res.json(recent_concerts);
      }
    })
}

// GET /randomsongs
const randomsongs = async function(req, res) {
  console.log(req.body.genres);
  const genres = req.body.genres.split(",");
  console.log(genres);
  let query = `
  SELECT
   a.image_url       AS image_url, 
   c.name            AS creator_name, 
   t.name            AS track_name, 
   a.release_date    AS album_release_date, 
   t.preview_url     AS track_preview
  FROM Tracks t
  JOIN Albums a
    ON t.album_id = a.album_id
  JOIN Creators c
    ON a.creator_id = c.creator_id
  WHERE 
    (a.release_date > "${req.query.year_start}-01-01")
    AND
    (a.release_date < "${req.query.year_end}-12-31")`

  if (genres){
    query += `AND (`
    let i = 0;
    while (i < genres.length) {
      console.log(genres[i]);

      if (i!=genres.length-1)
      {
        query += ` (c.genres LIKE '%${genres[i]}%') OR`
        i++;
      } 
      else 
      {
        query += ` (c.genres LIKE '%${genres[i]}%')`
        i++;
      }

    }
    query += `) `
  }

  query += ` ORDER BY a.release_date;`

  console.log(query);

  connection.query(query,
    (err, data) => {
      if (err || data.length === 0){
        console.log(err);
        res.json({});
      }
      else{
        let random_songs = [];
        for (var i = 0; i < data.length; i++){
          random_songs.push(data[i]);
        }
        res.json(random_songs);
      }
    })
}

module.exports = {
    test,
    song,
    artist,
    album,
    concert,
    concertsearch,
    creatorsearch,
    venuetopcreator,
    recentconcert,
    randomsongs,
}
