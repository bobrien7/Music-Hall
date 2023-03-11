import './songcard.css';

function SongCard() {

    // will this.props for these
    let title = "Top Song";
    let album = ""
    let song = "Placeholder test tesetest";
    let albumTitle = "Album test test test test";
    let player = "";

    // for audio: can do something like click on song card = play 30s preview, will figure out later
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
