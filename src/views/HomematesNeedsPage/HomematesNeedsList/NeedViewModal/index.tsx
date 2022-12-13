import ContentWithLabel from "components/ContentWithLabel";

import Modal from "components/Modal";
import styles from "./styles.module.scss";
import { ReactComponent as UserIcon } from "assets/user.svg";
import { ReactComponent as XIcon } from "assets/x.svg";
import { ReactComponent as LockIcon } from "assets/lock.svg";
import { ReactComponent as NewIcon } from "assets/new.svg";
import Button from "components/Button";

import { supabase } from "supabase";

import { UserNeed } from "models/UserNeed";
import { useCallback } from "react";
import { ProfilesNeed } from "models/ProfilesNeed";
import { useDispatch, useSelector } from "react-redux";
import { setProfilesNeeds } from "store/profilesNeeds";
import { RootState } from "store";
import { useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { isDateFromThisWeek } from "utils/date";

type Props = {
  handleClose: () => void;
  isVisible: boolean;
  need: UserNeed | null;
  creatorFirstName?: string;
};

export default function NeedViewModalModal(props: Props): JSX.Element {
  const house = useSelector((state: RootState) => state.auth.house);
  const dispatch = useDispatch();
  const { handleClose, isVisible, need, creatorFirstName = "" } = props;

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const user = supabase.auth.user();
  const isYou = need?.sponsor?.id === user?.id;

  const displayButtonText = () => {
    if (isLoading) {
      return "Loading...";
    }

    if (!need?.sponsor) {
      return "Book a need*";
    }

    if (isYou) {
      return "Unbook need";
    }

    if (need?.sponsor) {
      return "Already booked";
    }
  };

  const fetchProfilesNeeds = useCallback(
    async (houseId: string) => {
      if (houseId !== "") {
        setLoading(true);

        let { data, error } = await supabase
          .from("houses")
          .select(
            `profiles (
            id, firstName:first_name,
            userNeeds: user-needs!user-needs_user_id_fkey (
              id,
              need,
              createdAt:created_at,
              active,
              needUrl: need_url,
              sponsor: sponsor_id(id, firstName:first_name)
            )
          )`
          )
          .eq("id", houseId)
          .single();
        if (!error) {
          let profiles = data.profiles as ProfilesNeed[];

          const loggedUserProfile = profiles.find(
            (profile) => profile.id === user?.id
          );

          profiles = profiles.filter((profile) => profile.id !== user?.id);
          if (loggedUserProfile) profiles.unshift(loggedUserProfile);
          const profilesNeedsToSet = profiles.map((profile) => {
            const needs = profile.userNeeds.filter(
              (need) => need.active === true
            );
            const profileToSet: ProfilesNeed = { ...profile, userNeeds: needs };
            return profileToSet;
          });
          dispatch(setProfilesNeeds(profilesNeedsToSet));
        } else setError(error);
        setLoading(false);
      }
    },
    [dispatch, user?.id]
  );

  const updateUserNeedSponsor = async (
    needId: string,
    sponsorId: string | null
  ) => {
    await supabase
      .from("user-needs")
      .update({ sponsor_id: sponsorId })
      .eq("id", needId)
      .single();

    fetchProfilesNeeds(house?.id || "");
  };

  const handleBook = async () => {
    if (need && user && !need.sponsor) {
      await updateUserNeedSponsor(need.id, user.id);
    }

    if (need && user && user.id === need.sponsor?.id) {
      await updateUserNeedSponsor(need.id, null);
    }

    if (!error) {
      handleClose();
    }
  };

  const handleCloseModal = () => {
    handleClose();
  };

  return (
    <Modal isVisible={isVisible} handleClose={handleCloseModal}>
      <ContentWithLabel title="View need" noTopMargin={true}>
        <>
          <div className={styles.close} onClick={handleCloseModal}>
            <XIcon />
          </div>
          {need && (
            <div className={styles.modalContent}>
              <ContentWithLabel title="Need creator" size={14}>
                {creatorFirstName}
              </ContentWithLabel>
              <ContentWithLabel title="Need name" size={14}>
                {need.need}
              </ContentWithLabel>
              <ContentWithLabel title="Created at" size={14}>
                <div>
                  <span>{new Date(need.createdAt).toDateString()}</span>
                  <span className={styles.dateNewIcon}>
                    {isDateFromThisWeek(need.createdAt) && <NewIcon />}
                  </span>
                </div>
              </ContentWithLabel>
              {need.needUrl !== "" && (
                <ContentWithLabel title="Link" size={14}>
                  <a
                    href={need.needUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                  >
                    {need.needUrl}
                  </a>
                </ContentWithLabel>
              )}
              {need.sponsor && (
                <ContentWithLabel title="Assigned sponsor" size={14}>
                  <span className={styles.personAssigned}>
                    {need.sponsor.firstName}
                    {isYou && <UserIcon className={styles.userIcon} />}
                  </span>
                </ContentWithLabel>
              )}
              <div className={styles.alignBottom}>
                <div className={styles.buttonDescription}>
                  {need.sponsor && (
                    <span className={styles.icon}>
                      <LockIcon />
                    </span>
                  )}
                  <p>
                    {!!need.sponsor
                      ? `A need is already booked by ${
                          isYou ? "you" : need.sponsor.firstName
                        }`
                      : "*By booking you will be assigned to a need, the other housemates will be informed (without the need creator) and won’t be able to book also."}
                  </p>
                </div>
                <Button
                  type="button"
                  disabled={!!need.sponsor && !isYou}
                  onClick={handleBook}
                >
                  {displayButtonText()}
                </Button>
              </div>
            </div>
          )}
        </>
      </ContentWithLabel>
    </Modal>
  );
}
