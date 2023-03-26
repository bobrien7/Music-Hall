import { Slider } from "@mui/material";
import './playlist.css';
import { useState } from "react";
import SongCard from '../songcard/songcard.js';
import defaultAlbum from '../assets/default_album.png';
import { Divider } from '@mui/material';

function Playlist() {
    const [counter, setCounter] = useState(0);
    // temporary
    let maxCount = 2;
    const [start, setStart] = useState(false);
    const [end, setEnd] = useState(false);
    const [year, setYear] = useState([1910, 1980]);
    const [funk, setFunk] = useState(false);
    const [givenSongList, setGivenSongList] = useState([{
        "track_name": "Test song name",
        "artist_name": "Guns N Roses",
        "release_date": "date",
        "track_preview_url": "https://p.scdn.co/mp3-preview/80a49eba7f6517d4f1364e5b0a96d5dd08cff4ef?cid=4253f1c121cd47208ee35324d5b090b2",
        "album_image": "https://i.scdn.co/image/ab67616d00001e0221ebf49b3292c3f0f575f0f5",
        "album_title": "album title",
        "duration": "10:10"
    },
    {
        "track_name": "Test song name",
        "artist_name": "Guns N Roses",
        "release_date": "date",
        "track_preview_url": "https://p.scdn.co/mp3-preview/80a49eba7f6517d4f1364e5b0a96d5dd08cff4ef?cid=4253f1c121cd47208ee35324d5b090b2",
        "album_image": "https://i.scdn.co/image/ab67616d00001e0221ebf49b3292c3f0f575f0f5",
        "album_title": "album title",
        "duration": "10:10"
    }
]);
    const [savedSongList, setSavedSongList] = useState([]);
    let rejectedSongList = [];
    const marks = [
        {
          value: 1900,
          label: '1900',
        },
        {
          value: 2000,
          label: '2000',
        }
      ];

    const handleChange = (event, newYears) => {
        setYear(newYears);
    }

    const acceptDeny = (bool) => {
        if (bool) {
            setSavedSongList(savedSongList => [...savedSongList, givenSongList[counter]]);
        } else {
            rejectedSongList.push(givenSongList[counter]);
        }
        setCounter(counter+1);
        if (counter === maxCount - 1) {
            setEnd(true);
        }
    }

    const renderPage = () => {
        return (
        <div className="controls">
            <div className={(!start && !end) ? "transition" : "transparent"}>
                <div className="buttons">
                    <button className={funk ? "active" : ""} onClick={() => setFunk(!funk)}>Funk</button>
                </div>
                <div className="slider">
                    <Slider
                        className="sliderBody"
                        value={year}
                        valueLabelDisplay="on"
                        onChange={handleChange}
                        marks={marks}
                        min={1900}
                        max={2000}
                    />
                </div>
                <div className="startButtonDiv">
                    <button className="startButton" onClick={() => setStart(true)}>Start</button>
                </div>
            </div>
            <div className={start && !end ? "transition" : "transparent"}>
                    <div className="controlsSongs">
                        <button className="choice red" onClick={() => acceptDeny(false)}><div className="deny"></div></button>
                        <div className="backCardLight"></div>
                        <div className="backCard"></div>
                        <div className="card ">
                            <SongCard songInfo={counter < givenSongList.length ? givenSongList[counter] : givenSongList[0]} title="Top Song"/>
                        </div>
                        <button className="choice green" onClick={() => acceptDeny(true)}><div className="accept"></div></button>
                    </div>
                    <div className="count">{counter}/{maxCount}</div>
            </div>
            <div className={start && end ? "transition" : "transparent"}>
                <div className="listContainer">
                    {savedSongList.map((song, index) => {
                        console.log(savedSongList, song);
                        return (
                            <div key={index}>
                            <div className="song">
                                <img onError={(e) => e.target.src = defaultAlbum} className="albumAccordion" src={song.album_image} alt="album art"></img>
                                <div className="songInfo">
                                    <p className="accordionMainTitle">{song.track_name}</p>
                                    <p className="accordionSecondTitle">{song.artist_name}</p>
                                </div>
                                <div className="songInfo">
                                    <audio className="musicAccordion" controls="controls">
                                        <source src={song.track_preview_url} type="audio/mpeg"/>
                                    </audio>
                                </div>
                            </div>
                            {index !== savedSongList.length-1 ? <Divider variant="middle"/> : null}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>)
    }

    return (
        <div className="mainDiv">
            <div className="text">
                <h1>Playlist</h1>
                <p>Select song genres and time periods to get started, then accept or reject song selections to create a playlist!</p>
            </div>
            {renderPage()}
        </div>
    );
}

export default Playlist;
