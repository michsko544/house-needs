import { PostgrestError } from "@supabase/postgrest-js";
import { ProfilesNeed } from "models/ProfilesNeed";
import UserDropdown from "./UserDropdown";

type Props = {
  profilesNeeds: ProfilesNeed[];
  isLoading: boolean;
  error: PostgrestError | null;
  isUninitialized: boolean;
};

export type UserNeedPrepared = {
  id: string;
  firstName: string;
  needs: { id: string; need: string; createdAt: string }[];
};

export default function HomematesNeedsList(props: Props): JSX.Element {
  const { profilesNeeds, isLoading, error, isUninitialized } = props;
  return (
    <div>
      {profilesNeeds.length > 0 ? (
        profilesNeeds.map((user) => <UserDropdown user={user} key={user.id} />)
      ) : isLoading ? (
        <p className="loader">Loading...</p>
      ) : error ? (
        <p>{"Something went wrong :("}</p>
      ) : (
        !isUninitialized && <p className="loader">No needs founded.</p>
      )}
    </div>
  );
}
