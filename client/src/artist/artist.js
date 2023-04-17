import SongCard from '../songcard/songcard.js';
import './artist.css';
import Accordion from '@mui/material/Accordion';
import { Divider } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import defaultAlbum from '../assets/default_album.png';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const config = require('../config.json');

function Artist(props) {
    const params = useParams();
    const [link, setWikiLink] = useState("");
    const [summary, setSummary] = useState("Loading...");
    const [title, setTitle] = useState("Artist");
    const [topSong, setTopSong] = useState({
        "track_name": "",
        "artist_name": "",
        "release_date": "",
        "track_preview_url": "https://p.scdn.co/mp3-preview/80a49eba7f6517d4f1364e5b0a96d5dd08cff4ef?cid=4253f1c121cd47208ee35324d5b090b2",
        "album_image": "",
        "album_title": "",
        "duration": ""
    });
    const [albums, setAlbums] = useState([
        {"album_name": "Loading...",
        "album_id": "00ao0DAIYS0BNEbnbH0UCf",
        "release_date": "",
        "album_image": "",
        "song_list": [
            topSong,
            topSong
        ]}
    ]);

    const [simAlbums, setSimAlbums] = useState([
        [{
        "album_name": "Loading...",
        "album_image": "",
        "album_artist": "",
        "artist_id": ""},
        {
        "album": "Loading...",
        "album_image": "",
        "album_artist": "",
        "artist_id": ""}],
        []
    ]);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/artist/${params.artist_id}`)
          .then(res => res.json())
          .then(data => {
            setWikiLink("https://en.wikipedia.org/wiki/" + data.artist_info.artist_name);
            setSummary(data.artist_info.summary);
            setTitle(data.artist_info.artist_name);
            setTopSong(data.top_song);
            setAlbums(data.album_list);
        });
        let mainArr = [];
        for (let album in albums) {
            let arr = [];
            fetch(`http://${config.server_host}:${config.server_port}/similaralbums/${album.album_id}`)
            .then(res => res.json())
            .then(resJson => {
                for (let item in resJson.similar_albums) {
                    fetch(`http://${config.server_host}:${config.server_port}/album/${item}`)
                    .then(res => res.json())
                    .then(result => {
                        arr.push(result);
                    });
                }
            });
            mainArr.push(arr);
        }
        setSimAlbums([...mainArr]);
      }, [params.artist_id]);


    return (
        <div className="main">
            <div className="top">
                <div className="text">
                    <h1>{title}</h1>
                    <p>{summary}</p>
                    <a href={link}>Read More {'>'}</a>
                </div>
                <div>
                    <SongCard songInfo={topSong} title="Top Song"/>
                </div>
            </div>
            <div className="bottom">
                <h2>Albums</h2>
                <div className="listContainer">
                    {albums.map((album, index) => (
                        <div key={index}>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <div className="horizontalAccordionTitle">
                                <img onError={(e) => e.target.src = defaultAlbum} className="albumAccordion" src={album.album_image ? album.album_image : defaultAlbum} alt="album art"></img>
                                <div className="accordionTitle">
                                    <p className="accordionMainTitle">{album.album_name ? album.album_name : "Loading..."}</p>
                                    <p className="accordionSecondTitle">{album.release_date ? album.release_date : "Loading..."}</p>
                                </div>
                            </div>

                            </AccordionSummary>
                            <AccordionDetails className="outerSongContainer">
                                {album.song_list.map((song, albumIndex) => (
                                    <div className="song" key={albumIndex}>
                                        <div className="songInfo">
                                            <p className="accordionMainTitle">{song.track_name}</p>
                                            <p className="accordionSecondTitle">{"Duration: " + Math.floor(song.duration / 60000) + ":" + ((song.duration % 60000) / 1000).toFixed(0)}</p>
                                        </div>
                                        <div className="songInfo">
                                            <audio className="musicAccordion" controls="controls">
                                                <source src={song.track_preview_url} type="audio/mpeg"/>
                                            </audio>
                                        </div>
                                    </div>
                                ))}
                                {true && simAlbums[index] &&
                                    <div className="simAlbums">
                                    <p className="accordionMainTitle">Similar Albums:</p>
                                    <div className="simAlbumContainer">
                                    {simAlbums[index].map((alb, ind) => (
                                        <div className="simAlbumBox" key={ind}>
                                            <a className="simAlbumLink" href={"/artist/" + alb.artist_id}>
                                            <img onError={(e) => e.target.src = defaultAlbum} className="albumAccordion" src={alb.album_image} alt="album art"></img>
                                            <div className="textSimAlbums">
                                            <p className="accordionMainTitle">{alb.album_name}</p>
                                            <p className="accordionSecondTitle">{alb.album_artist}</p>
                                            </div>
                                            </a>
                                        </div>
                                    ))}
                                    </div>
                                    </div>
                                }

                            </AccordionDetails>
                        </Accordion>
                        {index !== albums.length-1 ? <Divider variant="middle"/> : null}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Artist;
