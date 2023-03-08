import { NavLink } from "react-router-dom";
import './NavBar.css';
import logo from './assets/logo.png';

function NavBar() {

  return (
    <div>
      <nav className='navBackground'>
        <div className="logo">
          <NavLink exact="true" to="/">
          <img className="logoImg" src={ logo } alt="Music Hall"></img>
          </NavLink>
        </div>

        <div className="flexContainer">
          <NavLink
              className={({ isActive }) =>
              isActive ? 'isactive navBox': 'inactive navBox'}
              exact="true" to="/timeline">
                <div className="navIcon timeline"></div>Timeline
          </NavLink>

          <NavLink
              className={({ isActive }) =>
              isActive ? 'isactive navBox': 'inactive navBox'}
              exact="true" to="/search">
                <div className="navIcon search"></div>Search
          </NavLink>

          <NavLink
              className={({ isActive }) =>
              isActive ? 'isactive navBox': 'inactive navBox'}
              exact="true" to="/playlist">
                <div className="navIcon playlist"></div>Playlist
          </NavLink>
        </div>

      </nav>
    </div>
  );
}

export default NavBar;
