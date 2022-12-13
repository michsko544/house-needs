import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "supabase";

import { RootState } from "store";
import { setHouse } from "store/auth";
import { setHouseNeeds } from "store/houseNeeds";
import { setHouses } from "store/houses";
import { setProfilesNeeds } from "store/profilesNeeds";

import { House } from "models/House";

import Chip from "components/Chip";
import ChipGroup from "components/ChipGroup";

import styles from "./styles.module.scss";

export default function HouseSelector(): JSX.Element {
  const user = supabase.auth.user();

  const dispatch = useDispatch();

  const houses = useSelector((state: RootState) => state.houses.houses);
  const selectedHouse = useSelector((state: RootState) => state.auth.house);

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
    <div className={styles.houseSelector}>
      <ChipGroup>
        {houses.map((house) => (
          <Chip
            key={house.id}
            value={house}
            label={house.name}
            onClick={() => handleHouseClick(house)}
            active={house.id === selectedHouse?.id}
          />
        ))}
      </ChipGroup>
    </div>
  );
}
