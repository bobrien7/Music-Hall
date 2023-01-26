import './App.css';
import { useEffect, useState } from 'react';
const config = require('./config.json');

function App() {

  const [testString, setTestString] = useState("");

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/test`)
      .then(res => res.text())
      .then(resJson => {setTestString(resJson)});
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          test
        </p>
        {testString}
      </header>
    </div>
  );
}

export default App;
