import './songcard.css';
import defaultAlbum from '../assets/default_album.png';

function SongCard(props) {

    // pass in props (see artist.js for example)
    let title = props.title;
    let album = props.songInfo.album_image;
    let song = props.songInfo.track_name;
    let albumTitle = props.songInfo.album_title;
    let player = props.songInfo.track_preview_url;
    let year = props.songInfo.release_date;


    return (
        <div className="base">
            <h3>{title}</h3>
            <div className="centerContainer">
                <div className="songcardContainer">
                    <img onError={(e) => e.target.src = defaultAlbum} className="album" src={album} alt="album art"></img>
                    <h3>{song}</h3>
                    <h4>{albumTitle}</h4>
                </div>
                <audio className="music" controls="controls">
                    <source src={player} type="audio/mpeg"/>
                </audio>
            </div>


        </div>
    );
}

export default SongCard;
