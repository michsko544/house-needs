import { ReactComponent as HomeIcon } from "assets/home.svg";
import { ReactComponent as UserIcon } from "assets/user.svg";
import { ReactComponent as MessageIcon } from "assets/message-square.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import classnames from "classnames";

import styles from "./styles.module.scss";

export default function Navbar(): JSX.Element {
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
        <NavLink to="/">
          <HomeIcon />
        </NavLink>
        <NavLink to="/homemates-needs">
          <UserIcon />
        </NavLink>
        <NavLink to="/messages">
          <MessageIcon />
        </NavLink>
      </nav>
    </header>
  );
}
