import './App.css';
import { useEffect, useState } from 'react';
const config = require('./config.json');

function App() {

  const [testString, setTestString] = useState("the backend is not connected!");
  const [titleString, setTitleString] = useState("");
  const [wikiString, setWikiString] = useState("");
  const [newString, setNewString] = useState("");

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/test`)
      .then(res => res.text())
      .then(resJson => {setTestString(resJson)});

    let search = "eminem";

    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=${search}`)
      .then(res => res.json())
      .then(resJson => {
        for (let i = 0; i < resJson["query"]["search"].length; i++) {
          let string = resJson["query"]["search"][i]["snippet"];
          let title = resJson["query"]["search"][i]["title"];
          if ((string.indexOf("band") !== -1 || string.indexOf("music") !== -1 || string.indexOf("sing") !== -1
          || string.indexOf("artist") !== -1 || title.indexOf("band") !== -1) &&
          (title.indexOf("disambiguation") === -1 && title.indexOf("album") === -1 && title.indexOf("ography") === -1)) {
            setTitleString(resJson["query"]["search"][i]["title"]);
            break;
          }
        }
      });

    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${titleString}&formatversion=2&exintro=1`)
      .then(res => res.json())
      .then(resJson => {
        let string = new DOMParser().parseFromString(resJson["query"]["pages"][0]["extract"], "text/html");
        setWikiString(string.firstChild.innerText);
      });
  }, [titleString]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {titleString}
        </p>
        <p>
          {testString}
        </p>
      </header>
      {wikiString}

      <p>
      <img src="https://i.scdn.co/image/ab67616d00001e0221ebf49b3292c3f0f575f0f5" alt="album cover" />
      </p>

      <p>
      <audio controls src="https://p.scdn.co/mp3-preview/80a49eba7f6517d4f1364e5b0a96d5dd08cff4ef?cid=4253f1c121cd47208ee35324d5b090b2"></audio>
      </p>

      hello
      {newString}

      </div>
  );
}

export default App;
