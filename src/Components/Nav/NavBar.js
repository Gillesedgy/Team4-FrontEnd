/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import "./NavBar.css";
import Button from "./Button";
import { json, Link } from "react-router-dom";
import logo from "../../Assets/logo1.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { VscAccount } from "react-icons/vsc";
import { TbHomeDollar } from "react-icons/tb";
import { MdWorkOutline } from "react-icons/md";
// import { BsWindowDesktop } from "react-icons/bs";
import { ContextData } from "../../Provider";
import { pages } from "../../constants";
import { getSiteTranslations } from "../../utils";
function NavBar() {
  const [click, setClick] = useState(false);
  const [hover, setHover] = useState({});

  // This object has the text for both the log in and log out buttons
  const [navBtnText, setNavBtnText] = useState({signInBtnText: "Log In", logoutBtnText: "Log Out"})
  
  // This structure represents the array of objects we display in the navbar
  const [navItems, setNavItems] = useState([
    { text: "Rentals", icon: TbHomeDollar, to: "/listings", id: "rentalsLinkText" },
    { text: "Jobs", icon: MdWorkOutline, to: "/jobs", id: "jobsLinkText" },
    { text: "Community", icon: GoCommentDiscussion, to: "/communityBoard", id: "communityLinkText" },
  ])

  const [navContent, setNavContent] = useState(null);

  const { user } = useContext(ContextData);
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_info");
    // This removes the translations when the user logs out (Optional)
    localStorage.removeItem('siteTranslations');
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
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  // This useEffect converts the site translations for the navbar to a useState variable
  useEffect(() => {
    if(!navContent) {
      // Gets site translations from local storage
      const navbarTranslations = getSiteTranslations(pages.NAVBAR);
      setNavContent(navbarTranslations)
    }
  }, [navContent])

useEffect(() => {
  if(navContent) {
    const translatedNavItems = navItems.map((item) => {
      return {...item, text: navContent[item?.id]}
    })
    setNavItems(translatedNavItems)
    setNavBtnText({signInBtnText: navContent.signInBtnText, logoutBtnText: navContent.logoutBtnText})
  }
}, [navContent])

useEffect(() => {
if(user.id && navContent) {
  const newNavItems = [{ text: "Account", icon: VscAccount, to: "/account", id: "accountLinkText" }, ...navItems]
  const translatedNavItems = newNavItems.map((item) => {
    return {...item, text: navContent[item?.id]}
  })
  setNavItems(translatedNavItems)
}
}, [user])

  return (
    <nav className={navbar ? "navbar active" : "navbar"}>
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

      <Button
        user={user}
        closeMobileMenu={closeMobileMenu}
        handleLogout={handleLogout}
        className="nav-sign-btn"
        textObj={navBtnText}
      />
    </nav>
  );
}

export default NavBar;
