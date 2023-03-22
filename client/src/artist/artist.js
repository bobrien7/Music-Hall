import SongCard from '../songcard/songcard.js';
import './artist.css';
import Accordion from '@mui/material/Accordion';
import { Divider } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Artist() {
    let link = "";
    let summary = "Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié ...";
    let title = "Artist placeholder";
    let topSong = {
        "track_name": "Test song name",
        "artist_name": "Guns N Roses",
        "release_date": "date",
        "track_preview_url": "https://p.scdn.co/mp3-preview/80a49eba7f6517d4f1364e5b0a96d5dd08cff4ef?cid=4253f1c121cd47208ee35324d5b090b2",
        "album_image": "https://i.scdn.co/image/ab67616d00001e0221ebf49b3292c3f0f575f0f5",
        "album_title": "album title",
        "duration": "10:10"
    };
    let albums = [
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
    ];

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
                                <img className="albumAccordion" src={album.album_image}></img>
                                <div className="accordionTitle">
                                    <p className="accordionMainTitle">test1</p>
                                    <p className="accordionSecondTitle">test2</p>
                                </div>
                            </div>

                            </AccordionSummary>
                            <AccordionDetails>
                                {album.song_list.map(song => (
                                    <div>
                                        <img className="album" src={song.album_image}></img>
                                        {song.track_name}
                                        {song.duration}
                                        <audio className="music" controls="controls">
                                            <source src={song.track_preview_url} type="audio/mpeg"/>
                                        </audio>
                                    </div>
                                ))}
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
