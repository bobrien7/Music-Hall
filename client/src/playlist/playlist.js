import { Slider } from "@mui/material";
import './playlist.css';
import { useState } from "react";

function Playlist() {

    const [start, setStart] = useState(false);
    const [year, setYear] = useState([1910, 1980]);
    const [funk, setFunk] = useState(false);
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

    const renderPage = () => {
        if (!start) {
            return (<div className="controls">
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
        </div>)
        } else {
            return(
                <div>
                    test
                </div>
            )
        }
    }

    return (
        <div className="mainDiv">
            <div className="text">
                <h1>Playlist</h1>
                <p>some flavor text</p>
            </div>
            {renderPage()}
        </div>
    );
}

export default Playlist;
