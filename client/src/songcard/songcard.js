import './songcard.css';

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
                    <img className="album" src={album}></img>
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
