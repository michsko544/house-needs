import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "store";
import { login, setHouse } from "store/auth";
import { supabase } from "supabase";

export default function AppInit(): null {
  const dispatch = useDispatch();
  const history = useHistory();
  const house = useSelector((state: RootState) => state.auth.house);
  const user = supabase.auth.user();

  useEffect(() => {
    if (user !== null && user.role === "authenticated") {
      dispatch(login(user));
      history.replace("/");
    }
  }, [dispatch, history, user]);

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
    if (house && house.id && house.name === "") getHouseName(house.id);
  }, [house, getHouseName]);

  return null;
}
