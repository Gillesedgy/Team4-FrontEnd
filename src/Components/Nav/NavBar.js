import React, { useState, useContext, useEffect} from "react";
import "./NavBar.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo1.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { VscAccount } from "react-icons/vsc";
import { TbHomeDollar } from "react-icons/tb";
import { MdWorkOutline } from "react-icons/md";
// import { BsWindowDesktop } from "react-icons/bs";
import { ContextData } from "../../Provider";

function NavBar() {
  const [click, setClick] = useState(false);
  const [hover, setHover] = useState({});
  const navItems = [
    { text: "Account", icon: VscAccount, to:"/account" },
    { text: "Rentals", icon: TbHomeDollar,  to:"/listings" },
    { text: "Jobs", icon: MdWorkOutline,  to:"/jobs"  },
    { text: "Community", icon: GoCommentDiscussion,  to:"/communityBoard"  },
  ];

  const { user } = useContext(ContextData);
  const handleLogout = () => {
    window.localStorage.removeItem("jwtToken");
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("user_info");
    window.location.href = "/";
  };

  const onHover = (index) => {
    setHover({ ...hover, [index]: true });
  };

  const onLeave = (index) => {
    setHover({ ...hover, [index]: false });
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [navbar, setNavbar] = useState(false)

  const changeBackground = () => {
   if(window.scrollY >= 100){
    setNavbar(true)
   }else{
    setNavbar(false)
   }
  }
  window.addEventListener('scroll', changeBackground)

  return (
    <nav className={navbar ?'navbar active' : 'navbar'}>
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
              onMouseLeave={() => onLeave(index)}
              role="button"
              tabIndex="-3"
            >
              {hover[index] ? item.text : <item.icon className="icon-nav" />}
            </Link>
          </li>
        ))}

        

      </ul>

      <Button user={user} closeMobileMenu={closeMobileMenu} handleLogout={handleLogout} className="nav-sign-btn" />
    </nav>
  );
}

export default NavBar;
