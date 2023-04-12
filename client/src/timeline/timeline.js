import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Grid, Slider } from '@mui/material';
import { useState } from 'react';
import SongCard from '../songcard/songcard.js';
import './timeline.css';

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
            'search': 'electr'
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
    }]);
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

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
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

    return (
        <div>
            <h1>Timeline</h1>
            <Grid 
                container
                rowSpacing={2}
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
            </Grid>
            <Carousel 
                responsive={responsive}
                showDots={true}
            >
                {givenSongList.map((item) => {
                    return <SongCard songInfo={item} title="Test"/>
                })}
                
            </Carousel>
        </div>
    );
}

export default Timeline;
