import { HouseNeed } from "models/HouseNeed";
import { supabase } from "supabase";
import NeedsList from "components/NeedsList";
import AddNeedInput from "../../components/AddNeedInput";
import useHouseNeeds from "./useHouseNeeds";
import { Need } from "models/Need";
import { RootState } from "store";
import { useSelector } from "react-redux";

export default function HomePage(): JSX.Element {
  const needs = useSelector((state: RootState) => state.houseNeeds.houseNeeds);
  const house = useSelector((state: RootState) => state.auth.house);
  const [
    { addNeed, updateNeed, deleteNeed },
    { isLoading, error, isUninitialized },
  ] = useHouseNeeds(house?.id || "");

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
      {needs.length > 0 ? (
        <>
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
        </>
      ) : isLoading ? (
        <p className="loader">Loading...</p>
      ) : error ? (
        <p>{"Something went wrong :("}</p>
      ) : (
        !isUninitialized && <p>No needs founded.</p>
      )}
      <AddNeedInput onCheckClick={handleNeedAdd} />
    </div>
  );
}
