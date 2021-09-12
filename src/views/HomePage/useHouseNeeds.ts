import { PostgrestError } from "@supabase/postgrest-js";
import { HouseNeed } from "models/HouseNeed";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "supabase";

export default function useHouseNeeds(): [
  needs: HouseNeed[],
  handlers: typeof handlers,
  statuses: { isLoading: boolean; error: PostgrestError | null }
] {
  const [needs, setNeeds] = useState<HouseNeed[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchHouseNeeds = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("home-needs").select("*");
    if (!error) setNeeds(data as HouseNeed[]);
    else setError(error);
    setLoading(false);
  };

  useEffect(() => {
    fetchHouseNeeds();
  }, []);

  const handlers = useMemo(
    () => ({
      addNeed: (newNeed: HouseNeed) => {
        setNeeds([...needs, newNeed]);
      },
      deleteNeed: (id: string) => {
        setNeeds(needs.filter((elem) => elem.id !== id));
      },
      updateNeed: (need: HouseNeed) => {
        setNeeds([...needs.filter((elem) => elem.id !== need.id), need]);
      },
    }),
    [needs]
  );

  return [needs, handlers, { isLoading, error }];
}
