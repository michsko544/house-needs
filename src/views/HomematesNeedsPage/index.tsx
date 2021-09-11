import ContentWithLabel from "components/ContentWithLabel";
import { UserNeed } from "models/UserNeed";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setHouse } from "store/auth";
import { supabase } from "supabase";
import HomematesNeedsList from "./HomematesNeedsList";

export default function HomematesNeedsPage(): JSX.Element {
  const house = useSelector((state: RootState) => state.auth.house);
  const user = supabase.auth.user();
  const [userNeeds, setUserNeeds] = useState<UserNeed[] | null>(null);
  const dispatch = useDispatch();

  const getUsersNeeds = useCallback(
    async (houseId: string) => {
      let { data, error } = await supabase
        .from("user-needs")
        .select(
          `
        id,
        need,
        created_at,
        user: profiles (
          first_name,
          id
        )
      `
        )
        .eq("house_id", houseId);
      if (!error) setUserNeeds(data as UserNeed[]);
    },
    [setUserNeeds]
  );

  const getHouseId = useCallback(
    async (userId: string) => {
      let { data: house, error } = await supabase
        .from("profiles")
        .select("house_id")
        .eq("id", userId)
        .single();
      if (!error) dispatch(setHouse({ id: house.house_id, name: "" }));
    },
    [dispatch]
  );

  const getHouseName = useCallback(
    async (houseId: string) => {
      let { data: house, error } = await supabase
        .from("houses")
        .select("name, id")
        .eq("id", houseId)
        .single();
      if (!error) dispatch(setHouse({ id: house.id, name: house.name }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!house && user) {
      getHouseId(user.id);
    }
  }, [house, user, getHouseId]);

  useEffect(() => {
    if (house && house.id) {
      getUsersNeeds(house.id);
    }
  }, [house, getUsersNeeds]);

  useEffect(() => {
    if (house && house.id && house.name === "") getHouseName(house.id);
  }, [house, getHouseName]);

  return (
    <div className="contentContainer">
      <ContentWithLabel
        title={`${
          house?.name !== "" ? house?.name + " homemates" : "Homemates"
        } needs`}
      >
        <HomematesNeedsList usersNeeds={userNeeds || []} />
      </ContentWithLabel>
    </div>
  );
}
