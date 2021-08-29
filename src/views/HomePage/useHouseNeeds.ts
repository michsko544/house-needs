import { HouseNeed } from "models/HouseNeed";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "supabase";

export default function useHouseNeeds(): [
  needs: HouseNeed[],
  handlers: typeof handlers
] {
  const [needs, setNeeds] = useState<HouseNeed[]>([]);

  const fetchHouseNeeds = async () => {
    const { data } = await supabase.from("home-needs").select("*");
    setNeeds(data as HouseNeed[]);
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

  return [needs, handlers];
}
