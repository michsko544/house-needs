import Button from "components/Button";
import HousesList from "components/HousesList";
import { House } from "models/House";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setHouse } from "store/auth";
import { setHouseNeeds } from "store/houseNeeds";
import { setHouses } from "store/houses";
import { setProfilesNeeds } from "store/profilesNeeds";
import { supabase } from "supabase";
import InvitationModal from "./InvitationModal";
import NewHouseModal from "./NewHouseModal";

import styles from "./styles.module.scss";

export default function HousesPage(): JSX.Element {
  const dispatch = useDispatch();
  const houses = useSelector((state: RootState) => state.houses.houses);
  const selectedHouse = useSelector((state: RootState) => state.auth.house);
  const [isInvModalOpen, setInvModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const user = supabase.auth.user();
  const getHouses = useCallback(
    async (userId: string) => {
      let { data, error } = await supabase
        .from("profiles")
        .select("houses (id, name)")
        .eq("id", userId)
        .single();
      if (!error) dispatch(setHouses([...(data.houses as House[])]));
    },
    [dispatch]
  );

  const handleHouseClick = async (house: House) => {
    if (user && (!selectedHouse || selectedHouse.id !== house.id)) {
      const { error } = await supabase
        .from("profiles")
        .update({ last_selected_house: house.id })
        .eq("id", user.id);
      if (!error) {
        dispatch(setHouse({ id: house.id, name: house.name }));
        dispatch(setHouseNeeds([]));
        dispatch(setProfilesNeeds([]));
      }
    }
  };

  useEffect(() => {
    if (user) {
      getHouses(user.id);
    }
  }, [user, getHouses]);

  return (
    <div className="contentContainer">
      <HousesList
        title="Your houses"
        houses={houses}
        onHouseClick={handleHouseClick}
      />
      <div className={styles.buttonsWrapper}>
        <Button
          className={styles.normalButton}
          onClick={() => setInvModalOpen(true)}
        >
          Send invitations
        </Button>
        <Button onClick={() => setAddModalOpen(true)}>Add new house</Button>
      </div>

      <InvitationModal
        isVisible={isInvModalOpen}
        handleClose={() => setInvModalOpen(false)}
      />
      <NewHouseModal
        handleClose={() => setAddModalOpen(false)}
        isVisible={isAddModalOpen}
      />
    </div>
  );
}
