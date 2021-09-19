import { PostgrestError } from "@supabase/postgrest-js";
import { UserNeed } from "models/UserNeed";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setUserNeeds } from "store/userNeeds";
import { supabase } from "supabase";

export default function useUserNeeds(houseId: string): [
  handlers: typeof handlers,
  statuses: {
    isLoading: boolean;
    error: PostgrestError | null;
    isUninitialized: boolean;
  },
  refetch: typeof fetchUserNeeds
] {
  const userNeeds = useSelector(
    (state: RootState) => state.userNeeds.userNeeds
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isUninitialized, setInitialized] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const dispatch = useDispatch();

  const fetchUserNeeds = useCallback(
    async (userId: string) => {
      setLoading(true);
      setInitialized(false);

      let { data, error } = await supabase
        .from("profiles")
        .select(
          `userNeeds: user-needs (
              id, need, createdAt:created_at, active
          )`
        )
        .eq("id", userId)
        .single();
      const userNeeds = (data.userNeeds as UserNeed[]).filter(
        (elem) => elem.active === true
      );
      if (!error) dispatch(setUserNeeds(userNeeds));
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
        const needs = userNeeds.filter((elem) => elem.id !== id);
        dispatch(setUserNeeds(needs.filter((elem) => elem.id !== id)));
      },
    }),
    [dispatch, userNeeds]
  );

  return [handlers, { isLoading, error, isUninitialized }, fetchUserNeeds];
}
