import { PostgrestError } from "@supabase/postgrest-js";
import { UserNeed } from "models/UserNeed";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setUserNeeds } from "store/userNeeds";
import { supabase } from "supabase";

export default function useUserNeeds(
  houseId: string
): [
  handlers: typeof handlers,
  statuses: {
    isLoading: boolean;
    error: PostgrestError | null;
    isUninitialized: boolean;
  },
  refetch: typeof fetchUserNeeds
] {
  const needs = useSelector((state: RootState) => state.userNeeds.userNeeds);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isUninitialized, setInitialized] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const dispatch = useDispatch();

  const fetchUserNeeds = useCallback(
    async (houseId: string) => {
      setLoading(true);
      setInitialized(true);
      let { data, error } = await supabase
        .from("user-needs")
        .select(
          `
      id,
      need,
      created_at,
      active,
      user: profiles (
        first_name,
        id
      )
    `
        )
        .eq("house_id", houseId)
        .eq("active", true);
      if (!error) dispatch(setUserNeeds(data as UserNeed[]));
      else setError(error);
      setLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    if (houseId !== "") fetchUserNeeds(houseId);
  }, [houseId, fetchUserNeeds]);

  const handlers = useMemo(
    () => ({
      deleteNeed: (id: string) => {
        dispatch(setUserNeeds(needs.filter((elem) => elem.id !== id)));
      },
    }),
    [dispatch, needs]
  );

  return [handlers, { isLoading, error, isUninitialized }, fetchUserNeeds];
}
