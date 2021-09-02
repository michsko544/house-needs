import ContentWithLabel from "components/ContentWithLabel";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { supabase } from "supabase";

export default function HomematesNeedsPage(): JSX.Element {
  const house = useSelector((state: RootState) => state.auth.house);
  const [userNeeds, setUserNeeds] = useState(null);

  const getUsersNeeds = async (houseId: string) => {
    let { data } = await supabase
      .from("user-needs")
      .select(
        `
        need,
        profile (
          id
        )
      `
      )
      .eq("house_id", houseId);

    setUserNeeds(data as any);
  };

  useEffect(() => {
    if (house) getUsersNeeds(house.id);
  }, [house]);

  return (
    <div className="contentContainer">
      <ContentWithLabel title="Homemates needs">
        <pre>{JSON.stringify(userNeeds)}</pre>
      </ContentWithLabel>
    </div>
  );
}
