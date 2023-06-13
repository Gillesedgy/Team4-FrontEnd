import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Button.css";

export default function Button({ user, handleLogout, closeMobileMenu, textObj }) {
  const [ loggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    if(user?.token) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [user])

  return (
    <>
      {!loggedIn && (
        <Link to="/login" onClick={closeMobileMenu}>
          <button className="btn">{textObj.signInBtnText}</button>
        </Link>
      )}

      {loggedIn && (
        <Link onClick={handleLogout}>
          <button className="btn">{textObj.logoutBtnText}</button>
        </Link>
      )}
    </>
  );
}
