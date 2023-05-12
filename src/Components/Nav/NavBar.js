import React, { useState } from "react";
import "./NavBar.css";
import Dropdown from "./Dropdown";
import Button from "./Button";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo1.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";

function NavBar() {
  const [click, setClick] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
 

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropDown(false);
    } else {
      setDropDown(false);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropDown(false);
    } else {
      setDropDown(true);
    }
  };

  const toggleDropDown = () => {
    
    setDropDown(!dropDown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img className="nav-logo" src={logo} alt="navlogo" />
        </Link>
      </div>
      <div className="menu-icon" onClick={handleClick}>
        {click ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/listings" className="nav-links" onClick={closeMobileMenu}>
            Rentals
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/jobs" className="nav-links" onClick={closeMobileMenu}>
            Jobs
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/communityBoard"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Community Board
          </Link>
        </li>
        <li
          className="nav-item"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link className="nav-links" onClick={toggleDropDown} >
            Add New <GoTriangleDown />
          </Link>
          {dropDown && <Dropdown />}
        </li>

        <li className="nav-item">
          <Link
            to="/login"
            className="nav-links-mobile"
            onClick={closeMobileMenu}
          >
            Sign in
          </Link>
        </li>
      </ul>
      <Button />
    </nav>
  );
}

export default NavBar;
