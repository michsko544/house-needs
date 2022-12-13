import styles from "./styles.module.scss";
import { supabase } from "supabase";
import { ReactComponent as UserIcon } from "assets/user.svg";
import { ReactComponent as ChevronDownIcon } from "assets/chevron-down.svg";
import { ReactComponent as LockIcon } from "assets/lock.svg";
import { ReactComponent as NewIcon } from "assets/new.svg";
import { useState } from "react";
import classnames from "classnames";
import { ProfilesNeed } from "models/ProfilesNeed";
import NeedViewModalModal from "../NeedViewModal";
import { UserNeed } from "models/UserNeed";
import { isDateFromThisWeek } from "utils/date";

interface Props {
  user: ProfilesNeed;
}

export default function UserDropdown(props: Props): JSX.Element {
  const { user } = props;
  const { firstName, userNeeds, id } = user;
  const supabaseUser = supabase.auth.user();
  const isYou = supabaseUser?.id === id;

  const [selectedNeed, setSelectedNeed] = useState<UserNeed | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setOpen] = useState(!isYou);

  const toggleOpen = (state: boolean) => setOpen(!state);

  const handleNeedClick = (e: React.MouseEvent, need: UserNeed) => {
    if (!isYou) {
      e.stopPropagation();
      setSelectedNeed(need);
      setIsModalOpen(true);
    }
  };

  return (
    <div className={styles.userDropdown}>
      <div
        className={classnames(styles.userDropdownInner, isOpen && styles.open)}
        onClick={() => toggleOpen(isOpen)}
      >
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            <div className={styles.name}>{isYou ? "You" : firstName}</div>
            {isYou && <UserIcon className={styles.userIcon} />}
          </div>
          <ChevronDownIcon className={styles.chevron} />
        </div>
        <ul>
          {[...userNeeds]
            .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
            .map((need) => (
              <li
                key={need.id}
                className={styles.needItem}
                onClick={(e) => handleNeedClick(e, need)}
              >
                <span
                  className={classnames(
                    styles.needName,
                    need.needUrl !== "" && styles.withLink
                  )}
                >
                  {need.need}
                </span>
                {need.sponsor && !isYou && (
                  <span className={styles.icon}>
                    <LockIcon />
                  </span>
                )}
                {isDateFromThisWeek(need.createdAt) && (
                  <span className={styles.icon}>
                    <NewIcon />
                  </span>
                )}
              </li>
            ))}
        </ul>
      </div>
      <NeedViewModalModal
        need={selectedNeed}
        creatorFirstName={firstName}
        isVisible={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
