import { PostgrestError } from "@supabase/supabase-js";
import ContentWithLabel from "components/ContentWithLabel";
import { ProfilesNeed } from "models/ProfilesNeed";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store";
import { setProfilesNeeds } from "store/profilesNeeds";
import { supabase } from "supabase";
import HomematesNeedsList from "./HomematesNeedsList";

export default function HomematesNeedsPage(): JSX.Element {
  const house = useSelector((state: RootState) => state.auth.house);
  const user = supabase.auth.user();
  const profilesNeeds = useSelector(
    (state: RootState) => state.profilesNeeds.profilesNeeds
  );

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isUninitialized, setInitialized] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const dispatch = useDispatch();

  const fetchProfilesNeeds = useCallback(
    async (houseId: string) => {
      if (houseId !== "") {
        setLoading(true);
        setInitialized(false);

        let { data, error } = await supabase
          .from("houses")
          .select(
            `profiles (
            id, firstName:first_name,
            userNeeds: user-needs (
              id, need, createdAt:created_at, active
            )
          )`
          )
          .eq("id", houseId)
          .single();
        if (!error) {
          let profiles = data.profiles as ProfilesNeed[];

          const loggedUserProfile = profiles.find(
            (profile) => profile.id === user?.id
          );

          profiles = profiles.filter((profile) => profile.id !== user?.id);
          if (loggedUserProfile) profiles.unshift(loggedUserProfile);
          const profilesNeedsToSet = profiles.map((profile) => {
            const needs = profile.userNeeds.filter(
              (need) => need.active === true
            );
            const profileToSet: ProfilesNeed = { ...profile, userNeeds: needs };
            return profileToSet;
          });
          dispatch(setProfilesNeeds(profilesNeedsToSet));
        } else setError(error);
        setLoading(false);
      }
    },
    [dispatch, user?.id]
  );

  useEffect(() => {
    fetchProfilesNeeds(house?.id || "");
  }, [fetchProfilesNeeds, house?.id]);

  return (
    <div className="contentContainer">
      <ContentWithLabel
        title={`${
          house?.name !== "" && house?.name !== undefined
            ? house?.name + " homemates"
            : "Homemates"
        } needs`}
      >
        <HomematesNeedsList
          profilesNeeds={profilesNeeds}
          isLoading={isLoading}
          isUninitialized={isUninitialized}
          error={error}
        />
      </ContentWithLabel>
    </div>
  );
}
