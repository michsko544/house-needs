import { PostgrestError } from "@supabase/postgrest-js";
import { HouseNeed } from "models/HouseNeed";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setHouseNeeds } from "store/houseNeeds";
import { supabase } from "supabase";

export default function useHouseNeeds(houseId: string): [
  handlers: typeof handlers,
  statuses: {
    isLoading: boolean;
    error: PostgrestError | null;
    isUninitialized: boolean;
  }
] {
  const needs = useSelector((state: RootState) => state.houseNeeds.houseNeeds);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isUninitialized, setInitialized] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const dispatch = useDispatch();

  const fetchHouseNeeds = useCallback(
    async (houseId: string) => {
      setLoading(true);
      setInitialized(false);
      const { data, error } = await supabase
        .from("home-needs")
        .select("*")
        .eq("house_id", houseId);
      if (!error) dispatch(setHouseNeeds(data as HouseNeed[]));
      else setError(error);
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    if (houseId !== "") fetchHouseNeeds(houseId);
  }, [houseId, fetchHouseNeeds]);

  const handlers = useMemo(
    () => ({
      addNeed: (newNeed: HouseNeed) => {
        dispatch(setHouseNeeds([...needs, newNeed]));
      },
      deleteNeed: (id: string) => {
        dispatch(setHouseNeeds(needs.filter((elem) => elem.id !== id)));
      },
      updateNeed: (need: HouseNeed) => {
        dispatch(
          setHouseNeeds([...needs.filter((elem) => elem.id !== need.id), need])
        );
      },
    }),
    [dispatch, needs]
  );

  return [handlers, { isLoading, error, isUninitialized }];
}
