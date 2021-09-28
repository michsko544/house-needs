import ContentWithLabel from "components/ContentWithLabel";
import { useHistory, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "supabase";
import { useParams } from "react-router-dom";
import { setHouses } from "store/houses";
import { useDispatch, useSelector } from "react-redux";
import { House } from "models/House";
import { RootState } from "store";
import { setHouseNeeds } from "store/houseNeeds";
import { setHouse } from "store/auth";
import { setProfilesNeeds } from "store/profilesNeeds";

export default function JoinPage(): JSX.Element {
  let { id } = useParams<{ id: string }>();

  const history = useHistory();
  const location = useLocation();

  const user = supabase.auth.user();

  const [success, setSuccess] = useState(false);
  const [expiredError, setExpiredError] = useState(false);
  const [sameHouseError, setSameHouseError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isUninitialized, setUninitialized] = useState(true);

  const selectedHouse = useSelector((state: RootState) => state.auth.house);

  const dispatch = useDispatch();

  const handleInvitation = async () => {
    setLoading(true);
    setUninitialized(false);
    if (!user) {
      history.push(`/login?target=${location.pathname}`);
    } else {
      let { data: invitation, error } = await supabase
        .from("invitations")
        .select("created_at, house_id")
        .eq("id", id)
        .single();

      if (!error) {
        let { data: houses, error: housesError } = await supabase
          .from("profiles")
          .select("houses (id, name)")
          .eq("id", user.id)
          .single();

        if (!housesError) {
          dispatch(setHouses([...(houses.houses as House[])]));
          const found = (houses.houses as House[]).find(
            (house) => house.id === invitation.house_id
          );
          if (found) {
            setSameHouseError(true);
            setLoading(false);
            return;
          }

          const expiredDate = new Date(invitation.created_at);
          expiredDate.setDate(expiredDate.getDate() + 1);
          const now = new Date();

          if (now > expiredDate) {
            setExpiredError(true);
            setLoading(false);
            return;
          }

          const { error: joinError } = await supabase
            .from("profile_house")
            .insert([{ house_id: invitation.house_id, profile_id: user.id }]);

          if (!joinError) {
            setSuccess(true);

            if (
              user &&
              (!selectedHouse || selectedHouse.id !== invitation.house_id)
            ) {
              const { error } = await supabase
                .from("profiles")
                .update({ last_selected_house: invitation.house_id })
                .eq("id", user.id);
              if (!error) {
                dispatch(setHouse({ id: invitation.house_id, name: "" }));
                dispatch(setHouseNeeds([]));
                dispatch(setProfilesNeeds([]));
              }
            }
          }
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    handleInvitation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="contentContainer">
      {isUninitialized ? (
        ""
      ) : isLoading ? (
        <p>Loading...</p>
      ) : sameHouseError ? (
        <ContentWithLabel title="Your already join this house">
          <p>Your already join this house.</p>
        </ContentWithLabel>
      ) : expiredError ? (
        <ContentWithLabel title="Your link expired">
          <p>
            Unfortunately your link has expired, ask your friend to generate new
            invite link.
          </p>
        </ContentWithLabel>
      ) : success ? (
        <ContentWithLabel title="Successful join">
          <>
            <p>You have successfully join new house.</p>
          </>
        </ContentWithLabel>
      ) : (
        <ContentWithLabel title="Something went wrong">
          <p>Try again later.</p>
        </ContentWithLabel>
      )}
    </div>
  );
}
