import './App.css';
import Main from './Main';
import NavBar from './NavBar';
import Artist from './artist/artist';
import Venue from './venue/venue';
import Timeline from './timeline/timeline';
import Playlist from './playlist/playlist';
import Search from './search/search';
import Login from  './login/login';
import { Route, Routes } from "react-router-dom";
import "@fontsource/inter"
import { useState } from "react";

function App() {
  const [viewLogIn, setViewLogIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Login open={viewLogIn} onClose={() => setViewLogIn(false)}/>
      <div className="topBar">
        <button className="login" onClick={() => setViewLogIn(true)}>Login</button>
      </div>
      <NavBar />
      <div className="contain">
        <div className="contain-2">
          <div className="routePanel">
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route exact path="/timeline" element={<Timeline />} />
              <Route exact path="/search" element={<Search />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/artist/:artist_id" element={<Artist artist_id={'123'}/>} />
              <Route path="/venue" element={<Venue />} />
              <Route path="*" element={<Main />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
