import qs from "query-string";
import { ReactComponent as HomeIcon } from "assets/home.svg";
import { ReactComponent as UserIcon } from "assets/user.svg";
import { ReactComponent as UserPlusIcon } from "assets/user-plus.svg";
import { ReactComponent as UsersIcon } from "assets/users.svg";
import { ReactComponent as BurgerIcon } from "assets/menu.svg";
import { ReactComponent as XIcon } from "assets/x.svg";
import { ReactComponent as LogoutIcon } from "assets/log-out.svg";
import { ReactComponent as ChevronRightIcon } from "assets/chevron-right.svg";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import classnames from "classnames";

import styles from "./styles.module.scss";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import useOutsideClick from "hooks/useOutsideClick";
import { supabase } from "supabase";
import { logout } from "store/auth";
import useSearchParams from "hooks/useSearchParams";

export default function Navbar(): JSX.Element {
  const allowedSearchParams = useSearchParams();
  const hasSearchParams = Object.keys(allowedSearchParams).length > 0;

  const dispatch = useDispatch();
  const history = useHistory();

  const isLoggedin = useSelector((state: RootState) => state.auth.isLoggedin);
  const [line, setLine] = useState(styles.line1);
  const [isOpen, setOpen] = useState(false);
  const settingsRef = useRef(null);
  const settingsBgRef = useRef(null);

  const toggleOpen = (state: boolean) => setOpen(!state);
  useOutsideClick(settingsRef, () => toggleOpen(isOpen), settingsBgRef);

  const handleLogoutClick = async () => {
    let { error } = await supabase.auth.signOut();
    dispatch(logout());
    toggleOpen(isOpen);
    if (!error) history.push("/login");
  };

  let location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setLine(styles.line1);
        break;
      case "/personal-needs":
        setLine(styles.line2);
        break;
      case "/homemates-needs":
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
    <>
      <header className={styles.header}>
        <div className="contentContainer">
          <div className={styles.topHeaderWrapper}>
            <h1>House Needs</h1>
            {isLoggedin && <BurgerIcon onClick={() => toggleOpen(isOpen)} />}
          </div>
        </div>
        <nav className={classnames(styles.navigation, line)}>
          {isLoggedin ? (
            <>
              <NavLink to="/">
                <HomeIcon />
              </NavLink>
              <NavLink to="/personal-needs">
                <UserIcon />
              </NavLink>
              <NavLink to="/homemates-needs">
                <UsersIcon />
              </NavLink>
              {/* <NavLink to="/messages">
                <MessageIcon />
              </NavLink> */}
            </>
          ) : (
            <>
              <NavLink
                to={`/login${
                  hasSearchParams ? "?" + qs.stringify(allowedSearchParams) : ""
                }`}
              >
                <HomeIcon />
              </NavLink>
              <NavLink
                to={`/register${
                  hasSearchParams ? "?" + qs.stringify(allowedSearchParams) : ""
                }`}
              >
                <UserPlusIcon />
              </NavLink>
            </>
          )}
        </nav>
      </header>
      <div
        ref={settingsBgRef}
        className={classnames(styles.settingsBackground, isOpen && styles.open)}
      >
        <div
          className={classnames(styles.settings, isOpen && styles.open)}
          ref={settingsRef}
        >
          <div className={styles.settingsInner}>
            <div className={styles.close}>
              <XIcon onClick={() => toggleOpen(isOpen)} />
            </div>

            <div className={styles.logout} onClick={handleLogoutClick}>
              <LogoutIcon />
              <span>Logout</span>
            </div>

            <div className={styles.navList}>
              <ul className={styles.navListMain}>
                <li
                  onClick={() => toggleOpen(isOpen)}
                  className={styles.navListMainItem}
                >
                  <div
                    className={classnames(
                      styles.chevronIcon,
                      location.pathname === "/personal-needs" && styles.active
                    )}
                  >
                    <ChevronRightIcon />
                  </div>
                  <NavLink to="/personal-needs">My Needs</NavLink>
                </li>
                <li
                  onClick={() => toggleOpen(isOpen)}
                  className={styles.navListMainItem}
                >
                  <div
                    className={classnames(
                      styles.chevronIcon,
                      location.pathname === "/houses" && styles.active
                    )}
                  >
                    <ChevronRightIcon />
                  </div>
                  <NavLink to="/houses">My Houses</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
