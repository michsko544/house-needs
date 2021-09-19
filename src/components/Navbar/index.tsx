import { ReactComponent as HomeIcon } from "assets/home.svg";
import { ReactComponent as UserIcon } from "assets/user.svg";
import { ReactComponent as UserPlusIcon } from "assets/user-plus.svg";
import { ReactComponent as UsersIcon } from "assets/users.svg";
import { ReactComponent as SettingsIcon } from "assets/settings.svg";
import { ReactComponent as XIcon } from "assets/x.svg";
import { ReactComponent as LogoutIcon } from "assets/log-out.svg";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import classnames from "classnames";

import styles from "./styles.module.scss";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import useOutsideClick from "hooks/useOutsideClick";
import { supabase } from "supabase";
import { logout } from "store/auth";
import NeedsList from "components/NeedsList";
import { UserNeedEdit } from "models/UserNeed";
import useUserNeeds from "hooks/useUserNeeds";
import AddNeedInput from "components/AddNeedInput";

export default function Navbar(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = supabase.auth.user();
  const userNeeds = useSelector(
    (state: RootState) => state.userNeeds.userNeeds
  );
  const isLoggedin = useSelector((state: RootState) => state.auth.isLoggedin);
  const [line, setLine] = useState(styles.line1);
  const [isOpen, setOpen] = useState(false);
  const settingsRef = useRef(null);
  const settingsBgRef = useRef(null);
  const [{ deleteNeed }, { isLoading, error }, refetch] = useUserNeeds(
    user?.id || ""
  );

  const addUserNeed = async (need: UserNeedEdit) => {
    await supabase.from("user-needs").insert([need]).single();
    refetch(user?.id || "");
  };

  const deleteUserNeed = async (id: string) => {
    const { error } = await supabase
      .from("user-needs")
      .update({ active: false })
      .eq("id", id)
      .single();

    if (!error) deleteNeed(id);
  };

  const toggleOpen = (state: boolean) => setOpen(!state);
  useOutsideClick(settingsRef, () => toggleOpen(isOpen), settingsBgRef);

  const handleLogoutClick = async () => {
    let { error } = await supabase.auth.signOut();
    dispatch(logout());
    toggleOpen(isOpen);
    if (!error) history.push("/");
  };

  let location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setLine(styles.line1);
        break;
      case "/homemates-needs":
        setLine(styles.line2);
        break;
      case "/houses":
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

  const handleNeedAdd = (text: string) => {
    if (user)
      addUserNeed({
        need: text,
        active: true,
        user_id: user.id,
      });
  };

  return (
    <>
      <header className={styles.header}>
        <div className="contentContainer">
          <div className={styles.topHeaderWrapper}>
            <h1>House Needs</h1>
            {isLoggedin && <SettingsIcon onClick={() => toggleOpen(isOpen)} />}
          </div>
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
              <NavLink to="/houses">
                <UsersIcon />
              </NavLink>
              {/* <NavLink to="/messages">
                <MessageIcon />
              </NavLink> */}
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

            <div className={styles.userNeedsWrapper}>
              {error && <p>{"Something went wrong :("}</p>}
              {isLoading && userNeeds.length === 0 && (
                <p className="loader">Loading...</p>
              )}
              {userNeeds.length > 0 && !isLoading && (
                <NeedsList
                  title="Your needs"
                  needs={userNeeds}
                  onNeedClick={() => {}}
                  onTrashClick={deleteUserNeed}
                  labelAlign="right"
                />
              )}
            </div>
            <AddNeedInput onCheckClick={handleNeedAdd} />
          </div>
        </div>
      </div>
    </>
  );
}
