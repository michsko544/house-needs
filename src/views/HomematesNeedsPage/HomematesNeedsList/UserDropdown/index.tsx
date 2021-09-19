import styles from "./styles.module.scss";
import { supabase } from "supabase";
import { ReactComponent as UserIcon } from "assets/user.svg";
import { ReactComponent as ChevronDownIcon } from "assets/chevron-down.svg";
import { useState } from "react";
import classnames from "classnames";
import { ProfilesNeed } from "models/ProfilesNeed";

interface Props {
  user: ProfilesNeed;
}

export default function UserDropdown(props: Props): JSX.Element {
  const { user } = props;
  const { firstName, userNeeds, id } = user;
  const supabaseUser = supabase.auth.user();

  const [isOpen, setOpen] = useState(supabaseUser?.id === id ? false : true);

  const toggleOpen = (state: boolean) => setOpen(!state);

  return (
    <div className={styles.userDropdown}>
      <div
        className={classnames(styles.userDropdownInner, isOpen && styles.open)}
        onClick={() => toggleOpen(isOpen)}
      >
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            <div className={styles.name}>
              {supabaseUser?.id === id ? "You" : firstName}
            </div>
            {supabaseUser?.id === id && (
              <UserIcon className={styles.userIcon} />
            )}
          </div>
          <ChevronDownIcon className={styles.chevron} />
        </div>
        <ul>
          {[...userNeeds]
            .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
            .map((need) => (
              <li key={need.id}>{need.need}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}
