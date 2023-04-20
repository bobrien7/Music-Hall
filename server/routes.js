const mysql = require('mysql')
const config = require('./config.json')

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.pass,
  port: config.port,
  database: config.db,
  multipleStatements : true
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
  artistId = req.params.artist_id;
  //album_id : string, release_date : date, song_list : {track_name : string, duration : integer,
  //  track_preview_url : string, track_uri: string
  const query1 = `
  SELECT A.album_id as album_id, A.release_date as release_date , T.name as track_name,
         T.duration_ms as duration, T.preview_url as track_preview_url, T.track_id as track_uri, T.track_number as track_number
  FROM Creators
  JOIN Albums A
    on Creators.creator_id = A.creator_id
  JOIN Tracks T
    on A.album_id = T.album_id
  WHERE Creators.creator_id="${artistId}"
  ORDER BY A.album_id, track_number`

  const query2 = `
  SELECT T.name as track_name, A.name as album_name, A.release_date as release_date,
         T.preview_url as track_preview_url, A.image_url as album_image, T.duration_ms as duration
  FROM Creators
  JOIN Albums A
     on Creators.creator_id = A.creator_id
  JOIN Tracks T
     on A.album_id = T.album_id
  WHERE Creators.creator_id="${artistId}"
  ORDER BY T.popularity DESC
  LIMIT 1`

  const query3 = `
  SELECT name AS artist_name, summary, years_active_begin AS year_begin,
    years_active_end AS year_end, image_url AS image, birth_name, genres
  FROM Creators
  WHERE Creators.creator_id="${artistId}"`

  var artistTopSong = [];

  connection.query(query3,
    (err, data) => {
      if (err || data.length === 0) {
        console.log("Error in artist endpoint:", err);
        res.json({});
      }
      else{
        let artist_info = [];
        for (var i = 0; i < data.length; i++){
          artist_info.push(data[i]);
        }
        //res.json(artist_info[0]);

        connection.query(query2,
          (err, data) => {
            if (err || data.length === 0) {
              console.log("Error in artist endpoint:", err);
              res.json({});
            }
            else {
              let top_song = [];
              for (var i = 0; i < data.length; i++){
                top_song.push(data[i]);
              }

              connection.query(query1,
                (err, data) => {
                  if (err || data.length === 0) {
                    console.log("Error in artist endpoint:", err);
                    res.json({});
                  }
                  else {
                    let track_list = [];
                    for (var i = 0; i < data.length; i++){
                      track_list.push(data[i]);
                    }

                    let response = {...artist_info[0], top_song: top_song[0], album_list: []}

                    for (let i=0; i<track_list.length; i++){
                        let index = response.album_list.findIndex(element=> 
                                  element.album_id===track_list[i].album_id);
                        if (index < 0){
                          response.album_list.push(
                             {album_id:track_list[i].album_id,
                              release_date:track_list[i].release_date,
                              song_list:[{track_uri:track_list[i].track_uri,
                                          track_name:track_list[i].track_name,
                                          duration:track_list[i].duration,
                                          track_preview_url:track_list[i].track_preview_url,
                                          track_number:track_list[i].track_number}]});
                        }
                        else{
                          response.album_list[index].song_list.push(
                                          {track_uri:track_list[i].track_uri,
                                          track_name:track_list[i].track_name,
                                          duration:track_list[i].duration,
                                          track_preview_url:track_list[i].track_preview_url,
                                          track_number:track_list[i].track_number});
                        }
                    }
                    res.json(response);
              }});
            }
          });
      }
    });
}

// GET /album/:album_id
const album = async function (req, res) {
  //console.log(req.params);
  cannedAlbum = {"album_name": "test album2 2324 23413 34",
        "album_image": "https://i.scdn.co/image/ab67616d00001e020f7ea7d45b75a3dabac59140",
        "album_artist": "Guns N Roses",
        "artist_id": "1234"};
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
    v.venue_id                      AS venue_id,
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
    cr.creator_id                 AS creator_id,
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
  const page = req.query.page;
  const pageSize = req.query.page_size ?? 10;
  const offset = (page - 1) * pageSize;
  let query = `
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

  if (page) {
    query += ` LIMIT ${pageSize} OFFSET ${offset}`
  }

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
  const page = req.query.page;
  const pageSize = req.query.page_size ?? 10;
  const offset = (page - 1) * pageSize;

  let query = `
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
  ORDER BY co.date DESC`

  if (page) {
    query += ` LIMIT ${pageSize} OFFSET ${offset}`
  }

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
  //console.log("req", req);
  console.log("genres", req.body.genres);
  const genres = req.body.genres;
  const songs_required = req.body.songs_required;
  // if (req.body.genres.length > 0) {
  //   genres = req.body.genres.split(",");
  // }

  //console.log(genres);
  let query = `
  SELECT
   a.image_url       AS album_image,
   c.name            AS artist_name,
   t.name            AS track_name,
   a.release_date    AS release_date,
   t.preview_url     AS track_preview_url,
   t.track_id        AS track_uri
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

  connection.query(query,
    (err, data) => {
      if (err || data.length === 0){
        console.log(err);
        res.json({});
      }
      else{
        let random_songs = [];
        for (var i = 0; i < songs_required; i++){
          let rand = Math.floor(Math.random() * data.length);
          //console.log(rand);
          random_songs.push(data[rand]);
        }
        console.log(random_songs);
        res.json(random_songs);
      }
  })
}

// POST /playlists
const playlists = async function(req, res) {

  let query = `WITH liked_songs AS
         (SELECT Tracks.track_id, popularity, acousticness, danceability, energy, instrumentalness,
                 track_key, liveness, loudness, speechiness, valence, tempo
          FROM Tracks
          JOIN TrackFeatures ON Tracks.track_id=TrackFeatures.track_id
          WHERE Tracks.track_id IN (`

  let liked = req.body.liked_songs;

  for (let i = 0; i < liked.length-1; i++){
      query += `'${liked[i]}',`
  }
  query += `'${liked.pop()}'))`

  query += `SELECT @v1:=AVG(acousticness), @v2:=AVG(danceability), @v3:=AVG(tempo)
  FROM liked_songs;

  SELECT *, COUNT(album_name) as counts, group_concat(track_uri separator ', ')
  FROM (
  SELECT *
  FROM
      (SELECT T.name as track_name, T.track_id as track_uri, A.name as album_name,
            C.name as artist_name, A.release_date, T.preview_url as track_preview_url,
            A.image_url as album_image, TF.acousticness, TF.danceability, TF.tempo
          FROM TrackFeatures TF
          JOIN Tracks T
            on TF.track_id = T.track_id
          JOIN Albums A
            on T.album_id = A.album_id
          JOIN Creators C
            on A.creator_id = C.creator_id
          WHERE abs(TF.acousticness-@v1) < .5) x
      WHERE abs(x.danceability-@v2) < .5) y
      WHERE abs(y.tempo-@v3) < 100
        AND artist_name NOT IN  (SELECT C.name
                                  FROM Tracks
                                  JOIN Albums A
                                      on Tracks.album_id = A.album_id
                                  JOIN Creators C
                                      on A.creator_id = C.creator_id
                                  WHERE Tracks.track_id IN (`

  let unliked = req.body.unliked_songs;
  for (let i = 0; i < unliked.length-1; i++){
      query += `'${unliked[i]}',`
  }
  query += `'${unliked.pop()}'`

  query += `))
      GROUP BY artist_name
      ORDER BY counts DESC
      LIMIT ${parseInt(req.body.songs_required)}
  `

  connection.query(query,
    (err, data) => {
      if (err || data.length === 0){
        console.log(err);
        res.json({});
      }
      else{
        let playlist = [];
        for (var i = 0; i < data[1].length; i++){
          playlist.push(data[1][i]);
          console.log(data[i]);
        }
        res.json({song_recs: playlist});
      }
    })
}

// GET /similaralbums/:
const similaralbums = async function(req, res) {
  const query = `
  SELECT @x1:=AVG(acousticness), @x2:=AVG(danceability), @x3:=AVG(energy), @x4:=AVG(instrumentalness),
  @x5:=AVG(liveness), @x6:=AVG(speechiness), @x7:=AVG(valence), @x8:=AVG(tempo)
  FROM Albums A
  JOIN Tracks T
  on A.album_id = T.album_id
  JOIN TrackFeatures TF
  on T.track_id = TF.track_id
  WHERE A.album_id="${req.params.album_id}"
  GROUP BY A.album_id;

  SELECT A.album_id, A.name, A.creator_id, abs(AVG(acousticness)-@x1) + abs(AVG(danceability)-@x2) +
  abs(AVG(energy)-@x3) + abs(AVG(instrumentalness)-@x4) + abs(AVG(liveness)-@x5) +
  abs(AVG(speechiness)-@x6) + abs(AVG(valence)-@x7) + 0.3 * abs(AVG(tempo)-@x8) as total_diff
  FROM Albums A
  JOIN Tracks T
  on A.album_id = T.album_id
  JOIN TrackFeatures TF
  on T.track_id = TF.track_id
  WHERE A.album_id!="${req.params.album_id}"
  GROUP BY A.album_id

  ORDER BY total_diff
  LIMIT ${parseInt(req.query.number_of_albums)}`;

  connection.query(query,
    (err, data) => {
      if (err || data.length === 0){
        console.log(err);
        res.json({});
      }
      else{
        let response = [];
        for (var i = 1; i < data.length; i++){
          // drop first two results. 1st is matching metrics and second is the album requested
          response.push(data[i]);
        }
        let similar_albums = [];
        for (let i = 0; i < response[0].length; i++) {
          similar_albums.push(response[0][i].album_id);
        }
        res.json({"similar_albums" : similar_albums});
      }
    })
}

// GET /randomvenue/
const randomvenue = async function(req, res) {
  console.log(req.query);
  const query = `SELECT * FROM Venue`

  connection.query(query,
    (err, data) => {
      if (err || data.length === 0){
        console.log(err);
        res.json({});
      }
      else{
        let random_venue = data[Math.floor(Math.random()*data.length)]
        res.json(random_venue);
      }
  })
}

// GET /randomartist/
const randomartist = async function(req, res) {
  console.log(req.query);
  const query = `SELECT * FROM Creators`

  connection.query(query,
    (err, data) => {
      if (err || data.length === 0){
        console.log(err);
        res.json({});
      }
      else{
        let random_creator = data[Math.floor(Math.random()*data.length)]
        res.json(random_creator);
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
    playlists,
    similaralbums,
    randomvenue,
    randomartist
}
