import SongCard from '../songcard/songcard.js';
import './artist.css';
import Accordion from '@mui/material/Accordion';
import { Divider } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import defaultAlbum from '../assets/default_album.png';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const config = require('../config.json');

function Artist(props) {
    const [link, setWikiLink] = useState("");
    const [summary, setSummary] = useState("Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié ...");
    const [title, setTitle] = useState("Artist");
    const [topSong, setTopSong] = useState({
        "track_name": "Test song name",
        "artist_name": "Guns N Roses",
        "release_date": "date",
        "track_preview_url": "https://p.scdn.co/mp3-preview/80a49eba7f6517d4f1364e5b0a96d5dd08cff4ef?cid=4253f1c121cd47208ee35324d5b090b2",
        "album_image": "https://i.scdn.co/image/ab67616d00001e0221ebf49b3292c3f0f575f0f5",
        "album_title": "album title",
        "duration": "10:10"
    });
    const [albums, setAlbums] = useState([
        {"album": "test album",
        "release_date": "1960",
        "album_image": "https://i.scdn.co/image/ab67616d00001e0221ebf49b3292c3f0f575f0f5",
        "song_list": [
            topSong,
            topSong
        ]},
        {
        "album": "test album2",
        "release_date": "1970",
        "album_image": "https://i.scdn.co/image/ab67616d00001e0221ebf49b3292c3f0f575f0f5",
        "song_list": [
            topSong,
            topSong
        ]}
    ]);

    const [simAlbums, setSimAlbums] = useState([
        [{
        "album": "test album2 2324 23413 34",
        "album_image": "https://i.scdn.co/image/ab67616d00001e0221ebf49b3292c3f0f575f0f5",
        "album_artist": "Guns N Roses",
        "artist_id": "1234"},
        {
            "album": "test album2 2324 23413 34",
            "album_image": "https://i.scdn.co/image/ab67616d00001e0221ebf49b3292c3f0f575f0f5",
            "album_artist": "Guns N Roses",
            "artist_id": "1234"}], []
    ]);

    // useEffect(() => {
    //     fetch(`http://${config.server_host}:${config.server_port}/artist/${props.artistId}`)
    //       .then(res => res.text())
    //       .then(resJson => {
    //         console.log(resJson);
    //         setWikiLink(props.page_name);
    //         setSummary(props.summary);
    //         setTitle(props.artist_name);
    //         setTopSong(props.top_song);
    //         setAlbums(props.albums);
    //     });
    //     let arr;
    //     for (let album in albums) {
    //         fetch(`http://${config.server_host}:${config.server_port}/album/${album.album_uri}`)
    //         .then(res => res.text())
    //         .then(resJson => {
    //             arr.push(resJson);
    //         });
    //     }
    //   }, [props]);

    return (
        <div>
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
                                <img onError={(e) => e.target.src = defaultAlbum} className="albumAccordion" src={album.album_image} alt="album art"></img>
                                <div className="accordionTitle">
                                    <p className="accordionMainTitle">test1</p>
                                    <p className="accordionSecondTitle">test2</p>
                                </div>
                            </div>

                            </AccordionSummary>
                            <AccordionDetails className="outerSongContainer">
                                {album.song_list.map((song, albumIndex) => (
                                    <div className="song" key={albumIndex}>
                                        <div className="songInfo">
                                            <p className="accordionMainTitle">{song.track_name}</p>
                                            <p className="accordionSecondTitle">{song.duration}</p>
                                        </div>
                                        <div className="songInfo">
                                            <audio className="musicAccordion" controls="controls">
                                                <source src={song.track_preview_url} type="audio/mpeg"/>
                                            </audio>
                                        </div>
                                    </div>
                                ))}
                                {true && simAlbums[index].length > 0 &&
                                    <div className="simAlbums">
                                    <p className="accordionMainTitle">Similar Albums:</p>
                                    <div className="simAlbumContainer">
                                    {simAlbums[index].map((alb, ind) => (
                                        <div className="simAlbumBox" key={ind}>
                                            <a className="simAlbumLink" href={"/artist/" + alb.artist_id} exact>
                                            <img onError={(e) => e.target.src = defaultAlbum} className="albumAccordion" src={alb.album_image} alt="album art"></img>
                                            <div className="textSimAlbums">
                                            <p className="accordionMainTitle">{alb.album}</p>
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
