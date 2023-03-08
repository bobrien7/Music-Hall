import './App.css';
import Main from './Main';
import NavBar from './NavBar';
import Artist from './artist/artist';
import Concert from './concert/concert';
import Timeline from './timeline/timeline';
import Playlist from './playlist/playlist';
import Search from './search/search';
import { Route, Routes } from "react-router-dom";
import "@fontsource/inter"

function App() {

  return (
    <div className="App">
      <NavBar />
      <div className="contain">
        <div className="topBar"></div>
        <div className="routePanel">
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/timeline" element={<Timeline />} />
            <Route exact path="/search" element={<Search />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/concert" element={<Concert />} />
            <Route path="*" element={<Main />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
