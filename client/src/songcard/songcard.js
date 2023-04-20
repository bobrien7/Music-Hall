import './songcard.css';
import defaultAlbum from '../assets/default_album.png';

function SongCard(props) {

    // pass in props (see artist.js for example)
    let title = props.title;
    let showArtist = props.artist;
    let album = props.songInfo.album_image;
    let song = props.songInfo.track_name;
    let albumTitle = props.songInfo.album_name;
    let player = props.songInfo.track_preview_url;
    let year = props.songInfo.release_date.substring(0, 4);
    let artist = props.songInfo.artist_name;

    return (
        <div className="base">
            {title &&
            <h3>{title}</h3>
            }
            {!title &&
            <h3>{year}</h3>
            }
            <div className="centerContainer">
                <div className="songcardContainer">
                    <img onError={(e) => e.target.src = defaultAlbum} className="album" src={album} alt="album art"></img>
                    <h3>{song}</h3>
                    <h4>{showArtist ? artist : albumTitle}</h4>
                </div>
                <audio className="music" controls="controls">
                    <source src={player} type="audio/mpeg"/>
                </audio>
            </div>


        </div>
    );
}

export default SongCard;
