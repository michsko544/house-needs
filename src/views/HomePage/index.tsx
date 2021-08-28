import { HouseNeed } from "models/HouseNeed";
import { useEffect, useState } from "react";
import { supabase } from "supabase";
import NeedsList from "./NeedsList";
import AddNeedInput from "./AddNeedInput";

export default function HomePage(): JSX.Element {
  const fetchHouseNeeds = async () => {
    const { data } = await supabase.from("home-needs").select("*");
    setNeeds(data as HouseNeed[]);
  };

  const addHouseNeed = async (need: Omit<HouseNeed, "id">) => {
    const { data } = await supabase.from("home-needs").insert([need]).single();
    console.log(data);
    setNeeds([...needs, data]);
  };

  const updateHouseNeedActivity = async (id: string, active: boolean) => {
    const { data } = await supabase
      .from("home-needs")
      .update({ active: active })
      .eq("id", id)
      .single();

    const withoutUpdated = needs.filter((elem) => elem.id !== id);
    setNeeds([...withoutUpdated, data]);
  };

  useEffect(() => {
    fetchHouseNeeds();
  }, []);

  const [needs, setNeeds] = useState<HouseNeed[]>([]);

  const handleNeedClick = (need: HouseNeed) => {
    updateHouseNeedActivity(need.id, !need.active);
  };

  const handleNeedAdd = (text: string) => {
    if (text !== "") addHouseNeed({ name: text, active: true });
  };

  return (
    <div className="contentContainer" style={{ paddingBottom: 82 }}>
      <NeedsList
        title="Top needs"
        needs={needs}
        onNeedClick={handleNeedClick}
      />
      <NeedsList
        title="Realized needs"
        needs={needs}
        active={false}
        onNeedClick={handleNeedClick}
      />
      <AddNeedInput onCheckClick={handleNeedAdd} />
    </div>
  );
}
