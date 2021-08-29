import { HouseNeed } from "models/HouseNeed";
import { supabase } from "supabase";
import NeedsList from "./NeedsList";
import AddNeedInput from "./AddNeedInput";
import useHouseNeeds from "./useHouseNeeds";

export default function HomePage(): JSX.Element {
  const [needs, { addNeed, updateNeed, deleteNeed }] = useHouseNeeds();

  const addHouseNeed = async (need: Omit<HouseNeed, "id">) => {
    const { data } = await supabase.from("home-needs").insert([need]).single();
    addNeed(data);
  };

  const updateHouseNeedActivity = async (id: string, active: boolean) => {
    const { data } = await supabase
      .from("home-needs")
      .update({ active: active })
      .eq("id", id)
      .single();

    updateNeed(data);
  };

  const deleteHouseNeed = async (id: string) => {
    const { error } = await supabase.from("home-needs").delete().eq("id", id);

    if (!error) {
      deleteNeed(id);
    }
  };

  const handleNeedClick = (need: HouseNeed) => {
    updateHouseNeedActivity(need.id, !need.active);
  };

  const handleNeedAdd = (text: string) => {
    addHouseNeed({ name: text, active: true });
  };

  const handleTrashClick = (id: string) => {
    deleteHouseNeed(id);
  };

  return (
    <div className="contentContainer" style={{ paddingBottom: 82 }}>
      <NeedsList
        title="Top needs"
        needs={needs}
        onNeedClick={handleNeedClick}
        onTrashClick={handleTrashClick}
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
