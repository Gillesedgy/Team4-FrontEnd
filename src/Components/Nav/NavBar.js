import React, { useState } from "react";
import "./NavBar.css";
// import Dropdown from "./Dropdown";
import Button from "./Button";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo1.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import {BiHomeHeart} from "react-icons/bi"
import {TbHomeDollar} from 'react-icons/tb'
import {MdWorkOutline} from 'react-icons/md'


function NavBar() {
  const [click, setClick] = useState(false);
  // const [dropDown, setDropDown] = useState(false);


  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
 
 

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
            <BiHomeHeart className="icon-nav"/>Home 
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/listings" className="nav-links" onClick={closeMobileMenu}>
           <TbHomeDollar className="icon-nav"/> Rentals 
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/jobs" className="nav-links" onClick={closeMobileMenu}>
            <MdWorkOutline className="icon-nav"/>Jobs 
          </Link>
        </li>
        <li className="nav-item" >
          <Link 
            to="/communityBoard"
            className="nav-links"
            onClick={closeMobileMenu}
          >
           <GoCommentDiscussion className="icon-nav"/> Community 
          </Link>
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
      <Button className="nav-sign-btn"/>
    </nav>
  );
}

export default NavBar;
