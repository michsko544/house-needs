import { ReactComponent as HomeIcon } from "assets/home.svg";
import { ReactComponent as UserIcon } from "assets/user.svg";
import { ReactComponent as UserPlusIcon } from "assets/user-plus.svg";
import { ReactComponent as MessageIcon } from "assets/message-square.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import classnames from "classnames";

import styles from "./styles.module.scss";
import { RootState } from "store";
import { useSelector } from "react-redux";

export default function Navbar(): JSX.Element {
  const isLoggedin = useSelector((state: RootState) => state.auth.isLoggedin);
  const [line, setLine] = useState(styles.line1);
  let location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setLine(styles.line1);
        break;
      case "/homemates-needs":
        setLine(styles.line2);
        break;
      case "/messages":
        setLine(styles.line3);
        break;
      case "/register":
        setLine(styles.line2);
        break;
      case "/login":
        setLine(styles.line1);
        break;
      default:
        setLine("");
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <div className="contentContainer">
        <h1>House Needs</h1>
      </div>
      <nav className={classnames(styles.navigation, line)}>
        {isLoggedin ? (
          <>
            <NavLink to="/">
              <HomeIcon />
            </NavLink>
            <NavLink to="/homemates-needs">
              <UserIcon />
            </NavLink>
            <NavLink to="/messages">
              <MessageIcon />
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <HomeIcon />
            </NavLink>
            <NavLink to="/register">
              <UserPlusIcon />
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
