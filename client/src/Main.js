
import { useEffect, useState } from 'react';
const config = require('./config.json');

function Main() {

    const [testString, setTestString] = useState("the backend is not connected!");

    useEffect(() => {
      fetch(`http://${config.server_host}:${config.server_port}/test`)
        .then(res => res.text())
        .then(resJson => {setTestString(resJson); console.log(testString);});
    }, [testString]);

    return (
        <div>
          {testString}
        </div>
    );
}

export default Main;
