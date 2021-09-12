import { HouseNeed } from "models/HouseNeed";
import { supabase } from "supabase";
import NeedsList from "components/NeedsList";
import AddNeedInput from "./AddNeedInput";
import useHouseNeeds from "./useHouseNeeds";
import { Need } from "models/Need";

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

  const handleNeedClick = (need: Need) => {
    const found = needs.find((elem) => elem.id === need.id);
    if (found !== undefined) updateHouseNeedActivity(found.id, !found.active);
  };

  const handleNeedAdd = (text: string) => {
    addHouseNeed({ name: text, active: true });
  };

  const handleTrashClick = (id: string) => {
    deleteHouseNeed(id);
  };

  const prepareData = (needs: HouseNeed[], active: boolean): Need[] =>
    needs.reduce((acc: Need[], elem: HouseNeed): Need[] => {
      if (elem.active === active) acc.push({ need: elem.name, id: elem.id });
      return acc;
    }, []);

  return (
    <div className="contentContainer" style={{ paddingBottom: 82 }}>
      <NeedsList
        title="Top needs"
        needs={prepareData(needs, true)}
        onNeedClick={handleNeedClick}
        onTrashClick={handleTrashClick}
      />
      <NeedsList
        title="Realized needs"
        needs={prepareData(needs, false)}
        active={false}
        onNeedClick={handleNeedClick}
      />
      <AddNeedInput onCheckClick={handleNeedAdd} />
    </div>
  );
}
