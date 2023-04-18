import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Grid, Slider } from '@mui/material';
import { useState } from 'react';
import SongCard from '../songcard/songcard.js';
import './timeline.css';
const config = require('../config.json')

function Timeline() {

    const [genres, setGenres] = useState({
        'Rock': {
            'value': false,
            'search': 'rock'
        },
        'Pop': {
            'value': false,
            'search': 'pop'
        },
        'Metal': {
            'value': false,
            'search': 'metal'
        },
        'Dance': {
            'value': false,
            'search': 'dance'
        },
        'Hip Hop': {
            'value': false,
            'search': 'hip hop'
        },
        'Rap': {
            'value': false,
            'search': 'rap'
        },
        'Electro': {
            'value': false,
            'search': 'electro'
        },
        'Indie': {
            'value': false,
            'search': 'indie'
        },
        'Folk': {
            'value': false,
            'search': 'folk'
        },
        'Grunge': {
            'value': false,
            'search': 'grunge'
        },
        'Blues': {
            'value': false,
            'search': 'blues'
        },
        'Soul': {
            'value': false,
            'search': 'soul'
        },
        'R&B': {
            'value': false,
            'search': 'r&b'
        },
        'Wave': {
            'value': false,
            'search': 'wave'
        },
        'Mellow': {
            'value': false,
            'search': 'mellow'
        },
        'Punk': {
            'value': false,
            'search': 'punk'
        },
    });
    const [year, setYear] = useState([1910, 1980]);
    const [givenSongList, setGivenSongList] = useState([]);

    const handleChange = (event, newYears) => {
        setYear(newYears);
    }

    const fetchTracks = (year_start, year_end, genres) => {
        const genre_data = [];
        for (let key in genres) {
            const item = genres[key];
            if (item['value'] === true) {
                genre_data.push(key);
            }
        };
        fetch(`http://${config.server_host}:${config.server_port}/randomsongs/?year_start=${year_start}&year_end=${year_end}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({genres: genre_data.join(",")})
        })
            .then((res) => res.json())
            .then((res_data) => {
                const shuffled = res_data.sort(() => 0.5 - Math.random());
                const song_slice = shuffled.slice(0, 10);

                const return_data = []
                for (let index in song_slice) {
                    const entry = song_slice[index];
                    const new_entry = {
                        "track_name": entry["track_name"],
                        "artist_name": entry["creator_name"],
                        "release_date": entry["album_release_date"],
                        "track_preview_url": entry["track_preview"],
                        "album_image": entry["image_url"],
                        "album_title": "",
                        "duration": "0"
                    }
                    return_data.push(new_entry);
                }
                setGivenSongList(return_data);
            })
    }

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

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

    return (
        <div className="timelineParent">
            <h1>Timeline</h1>
            <Grid 
                container
                rowSpacing={2}
                align="center"
            >
                <Grid item xs={12}>
                    <div className="buttons">
                        {Object.keys(genres).map((key, index) => {
                            return(
                                <button key={index} className={genres[key]['value'] ? "active genres" : "genres"} onClick={() => setGenres({...genres, [key]: {'search': [key]['search'], 'value': ![key]['value']}})}>{key}</button>
                            )
                        })}
                    </div>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                    <button onClick={() => fetchTracks(year[0], year[1], genres)}>Search</button>
                </Grid>
                <Grid item xs={12}>
                    <Carousel 
                        responsive={responsive}
                        showDots={true}
                        partialVisbile
                        draggable
                    >
                        {givenSongList.map((item) => {
                            return <div>
                                    <SongCard songInfo={item} title="Test"/>
                                </div>
                        })}
                    </Carousel>
                </Grid>
            </Grid>
            
        </div>
    );
}

export default Timeline;
