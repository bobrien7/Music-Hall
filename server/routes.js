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
  console.log("artist endpoint params", JSON.stringify(req.params.artist_id));
  artistId = req.params.artist_id;

  const query1 = `
  SELECT *
  FROM Creators
  JOIN Albums A
    on Creators.creator_id = A.creator_id
  JOIN Tracks T
    on A.album_id = T.album_id
  WHERE Creators.creator_id="${artistId}"
  ORDER BY A.album_id, track_number`

  const query2 = `
  SELECT *
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

  /*
  { artist_name: string, summary :string, year_begin: integer, year_end: integer, image: string,
    birth_name: string, genres: {string, string, string}, top_song : {track_name : string,
      album_name : string, release_date : date, track_preview_url : string, album_image : string},
      album_list : [ { album_id : string, release_date : date,
        song_list : {track_name : string, duration : integer, track_preview_url : string, track_uri: string}
  */

  connection.query(query3,
    (err, data) => {
      // if (err || data.length === 0) {
      //   console.log("Artist endpoint data", data.length);
      //   console.log("Error in artist endpoint:", err);
      //   res.json({});
      // }
      //else{
        let artist_info = {
          "artist_name": "test artist",
          "summary": "summary info",
        };
        for (var i = 0; i < data.length; i++){
          artist_info.push(data[i]);
        }

        let top_song = {"track_name" : "Sensitive", "album_name" : "The Heavy Entertainment Show (Deluxe)",
        "release_date" : "2016-11-04", "track_preview_url" : "https://p.scdn.co/mp3-preview/076a94c30fc2c3f6d2840bb3582022f0722e39bc?cid=774b29d4f13844c495f206cafdad9c86",
        "album_image" : "https://i.scdn.co/image/ab67616d00001e020f7ea7d45b75a3dabac59140",
        "duration": 1000};

        let album_list = [ { "album_id" : "00ao0DAIYS0BNEbnbH0UCf", "release_date" : "2019-10-25", "album_name" : "The Heavy Entertainment Show (Deluxe)", "album_image" : "https://i.scdn.co/image/ab67616d00001e020f7ea7d45b75a3dabac59140",
        "song_list" : [{"track_name" : "Mr. Churchill Says - 2019 Remaster", "duration" : 282889, "track_preview_url" : "https://p.scdn.co/mp3-preview/64a1a8c6802273d9b05bb4d588f7bc78566b64c2?cid=774b29d4f13844c495f206cafdad9c86", "track_uri": "5IN85J8Zi6uAVgnyDpGbcH"},
                       {"track_name" : "Australia - 2019 Remaster", "duration" : 405583, "track_preview_url" : "https://p.scdn.co/mp3-preview/c9208f7ed22e9bcefa9f657686123957aa2cf7de?cid=774b29d4f13844c495f206cafdad9c86", "track_uri": "5jqasTlmERm4xXg22iN9Ii"},
                       {"track_name" : "The Future (with Ray Davies) - Doo-Wop Version", "duration" : 145773, "track_preview_url" : "https://p.scdn.co/mp3-preview/b9881a32da25a57e7d32b75d2d4ba23a5d06d272?cid=774b29d4f13844c495f206cafdad9c86", "track_uri": "6T2AKQcMdWYhyfKvjPmB58"}]}];

        //let artist_details = {"artist_info" : artist_info}
        let response = {
          "artist_info": artist_info,
          "top_song": top_song,
          "album_list": album_list
        };
        //console.log("serve test", response);
        //if (res.headersSent !== true) {
          res.json(response);
        //}

      }
    //}
    )
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

  console.log(query);

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
  console.log(req.body.songs_required);
  console.log(req.body.liked_songs);
  console.log(req.body.unliked_songs);

  const likedSongs = req.body.liked_songs;
  const unlikedSongs = req.body.unliked_songs;

  console.log(likedSongs);
  console.log(unlikedSongs);

  let query = `
  WITH
    liked_songs AS
         (SELECT Tracks.track_id, popularity, acousticness, danceability, energy, instrumentalness,
                 track_key, liveness, loudness, speechiness, valence, tempo
          FROM Tracks
          JOIN TrackFeatures ON Tracks.track_id=TrackFeatures.track_id
          WHERE Tracks.track_id in (`

          query += `
          "000wxXa9qv55sAp5YNH4TK",
          "001X6Bxouj5gvpiyiJSobk"    `

  query += `        )),

  unliked_artists AS
         (SELECT C.name
          FROM Tracks
          JOIN Albums A
              on Tracks.album_id = A.album_id
          JOIN Creators C
              on A.creator_id = C.creator_id
          WHERE Tracks.track_id in (   `

    query += `      "002zygf5KBABh8Q40gmxRu",
                    "003kbs1V2S3Mokl3nXF1PV",
                    "003z7jJLt6uHFL7MXNoiFG"`

  query += `)),

  averages AS (
        SELECT @v1:=AVG(acousticness), @v2:=AVG(danceability), @v3:=AVG(tempo)
        FROM liked_songs)

  SELECT *, COUNT(album_name) as counts, group_concat(track_id separator ', ')
  FROM (
  SELECT *
  FROM
      (SELECT T.name as track_name, T.track_id as track_id, A.name as album_name,
            C.name as creator_name, TF.acousticness, TF.danceability, TF.tempo
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
        AND creator_name NOT IN (SELECT * FROM unliked_artists)
      GROUP BY creator_name
      ORDER BY counts DESC`

      let song1 =
      {"track_name" : "Summertime Sadness",
      "track_uri" : "1Ist6PR2BZR3n2z2Y5R6S1",
      "artist_name" : "Lana Del Rey",
      "release_date" : "2012-01-01",
      "track_preview_url" : "https://p.scdn.co/mp3-preview/c2417b9b977404dfc4a3c6b6ef5ac8f7abccee54?cid=774b29d4f13844c495f206cafdad9c86",
      "album_image" : "https://i.scdn.co/image/ab67616d00001e02f894be72a77b1488292672c7"};

      let song2 = {"track_name" : "Honeymoon",
      "track_uri" : "4X5zaUdlRhvBWYnyQIKmH8",
      "artist_name" : "Lana Del Rey",
      "release_date" : "2015-09-18",
      "track_preview_url" : "https://p.scdn.co/mp3-preview/612e02d96d7fdaa4c2e2228d9f58924c0445fe30?cid=774b29d4f13844c495f206cafdad9c86",
      "album_image" : ""};

      let song3 = {"track_name" : "Buddy's Rendezvous",
      "track_uri" : "6WAu9T5MC9QvtTwkmx6fkg",
      "artist_name" : "Lana Del Rey",
      "release_date" : "2015-09-10",
      "track_preview_url" : "https://p.scdn.co/mp3-preview/880d9c4b8e7736f49366d55d561bd84d69c4b982?cid=774b29d4f13844c495f206cafdad9c86",
      "album_image" : "https://i.scdn.co/image/ab67616d00001e02c210a1bace4b8731308775a9"};

      let tracks = {"song_recs" : [song1, song2, song3, song1, song2, song3, song1, song2, song3]};

      res.json(tracks);
}

// GET /similaralbums/:
const similaralbums = async function(req, res) {
  console.log(req.params);
  const query = ``;
  /*
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
    */
   let similaralbums = {"similar_albums" : ["6mkLpQbCgXvhpcXZGE5DJn", "6KY2voufuen4nldrrHBkgH", "11oR0ZuqB3ucZwb5TGbZxb"]};

   res.json(similaralbums);
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
}
