import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./styles.module.scss";
import { RootState } from "store";
import { UserNeed } from "models/UserNeed";

import { supabase } from "supabase";
import NeedsList from "components/NeedsList";
import { UserNeedEdit } from "models/UserNeed";
import useUserNeeds from "hooks/useUserNeeds";
import AddNeedInput from "components/AddNeedInput";
import { updateProfileNeeds } from "store/profilesNeeds";

import NeedEditModal from "./NeedEditModal";

export default function PersonalNeedsPage() {
  const user = supabase.auth.user();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<UserNeed | null>(null);

  const userNeeds = useSelector(
    (state: RootState) => state.userNeeds.userNeeds
  );
  const profilesNeeds = useSelector(
    (state: RootState) => state.profilesNeeds.profilesNeeds
  );

  const [{ deleteNeed }, { isUninitialized, isLoading, error }, refetch] =
    useUserNeeds(user?.id || "");

  const addUserNeed = async (need: UserNeedEdit) => {
    const { data: newNeed } = await supabase
      .from("user-needs")
      .insert([need])
      .single();
    refetch(user?.id || "");
    const found = profilesNeeds.find(
      (profileNeeds) => profileNeeds.id === user?.id
    );
    if (found) {
      const needsToSet = [...found.userNeeds];
      needsToSet.push(newNeed as UserNeed);
      dispatch(updateProfileNeeds({ ...found, userNeeds: needsToSet }));
    }
  };

  const deleteUserNeed = async (id: string) => {
    const { error } = await supabase
      .from("user-needs")
      .update({ active: false })
      .eq("id", id)
      .single();

    if (!error) deleteNeed(id);
  };

  const handleNeedAdd = (text: string) => {
    if (user)
      addUserNeed({
        need: text,
        active: true,
        user_id: user.id,
      });
  };

  const handleNeedSelect = (need: UserNeed) => {
    setSelectedNeed(need);
    setIsModalOpen(true);
  };

  return (
    <div className="contentContainer">
      <div className={styles.userNeedsWrapper}>
        {userNeeds.length > 0 ? (
          <NeedsList
            title="Your needs"
            needs={[...userNeeds].sort((a, b) =>
              a.createdAt > b.createdAt ? -1 : 1
            )}
            onNeedClick={handleNeedSelect}
            onTrashClick={deleteUserNeed}
          />
        ) : isLoading ? (
          <p className="loader">Loading...</p>
        ) : error ? (
          <p>{"Something went wrong :("}</p>
        ) : (
          !isUninitialized && <p className="loader">No needs founded.</p>
        )}
      </div>
      <AddNeedInput onCheckClick={handleNeedAdd} />
      <NeedEditModal
        need={selectedNeed}
        isVisible={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
