import React, { useState } from "react";
import "./NavBar.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo1.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { BiHomeHeart } from "react-icons/bi";
import { TbHomeDollar } from "react-icons/tb";
import { MdWorkOutline } from "react-icons/md";

function NavBar() {
  const [click, setClick] = useState(false);
  const [hover, setHover] = useState({});
  const navItems = [
    { text: "Account", icon: BiHomeHeart, to:"/account" },
    { text: "Rentals", icon: TbHomeDollar,  to:"/listings" },
    { text: "Jobs", icon: MdWorkOutline,  to:"/jobs"  },
    { text: "Community", icon: GoCommentDiscussion,  to:"/communityBoard"  },
  ];

  const onHover = (index) => {
    setHover({ ...hover, [index]: true });
  };

  const onLeave = (index) => {
    setHover({ ...hover, [index]: false });
  };

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
        {navItems.map((item, index) => (
          <li className="nav-item" key={index}>
            <Link
              to={item.to}
              className="nav-links"
              onClick={closeMobileMenu}
              onMouseEnter={() => onHover(index)}
              onMouseOut={() => onLeave(index)}
              role="button"
              tabIndex="-3"
            >
              {hover[index] ? item.text : <item.icon className="icon-nav" />}
            </Link>
          </li>
        ))}

        <Link
          to="/login"
          className="nav-links-mobile"
          onClick={closeMobileMenu}
        >
          Sign in
        </Link>
      </ul>

      <Button className="nav-sign-btn" />
    </nav>
  );
}

export default NavBar;
