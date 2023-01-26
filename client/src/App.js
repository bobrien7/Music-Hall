import './App.css';
import { useEffect, useState } from 'react';
const config = require('./config.json');

function App() {

  const [testString, setTestString] = useState("the backend is not connected!");
  const [titleString, setTitleString] = useState("");
  const [wikiString, setWikiString] = useState("");

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/test`)
      .then(res => res.text())
      .then(resJson => {setTestString(resJson)});

    let search = "Franz Ferdinand music";

    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=${search}`)
      .then(res => res.json())
      .then(resJson => setTitleString(resJson["query"]["search"][0]["title"]));

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
      </div>
  );
}

export default App;
