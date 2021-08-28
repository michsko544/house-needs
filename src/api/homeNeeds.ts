import { supabase } from "supabase";

export const fetchHomeNeeds = async () => {
  return await supabase.from("home-needs").select("*");
};
