import { PostgrestError } from "@supabase/postgrest-js";
import { UserNeed } from "models/UserNeed";
import { supabase } from "supabase";
import UserDropdown from "./UserDropdown";

type Props = {
  usersNeeds: UserNeed[];
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
  const { usersNeeds, isLoading, error, isUninitialized } = props;
  const supabaseUser = supabase.auth.user();

  const prepareData = (usersNeeds: UserNeed[]): UserNeedPrepared[] => {
    const userNeedsPrepared: UserNeedPrepared[] = [];

    usersNeeds.forEach((userNeed) => {
      const foundUser = userNeedsPrepared.find(
        (elem) => elem.id === userNeed.user.id
      );

      if (foundUser) {
        foundUser.needs.push({
          id: userNeed.id,
          need: userNeed.need,
          createdAt: userNeed.created_at,
        });
      } else {
        const need: UserNeedPrepared = {
          id: userNeed.user.id,
          firstName: userNeed.user.first_name,
          needs: [
            {
              id: userNeed.id,
              need: userNeed.need,
              createdAt: userNeed.created_at,
            },
          ],
        };

        if (supabaseUser?.id === userNeed.user.id) {
          userNeedsPrepared.unshift(need);
        } else {
          userNeedsPrepared.push(need);
        }
      }
    });

    return userNeedsPrepared;
  };
  const userNeedsPrepared: UserNeedPrepared[] = prepareData(usersNeeds);

  return (
    <div>
      {userNeedsPrepared.length > 0 ? (
        userNeedsPrepared.map((user) => (
          <UserDropdown user={user} key={user.id} />
        ))
      ) : isLoading ? (
        <p className="loader">Loading...</p>
      ) : error ? (
        <p>{"Something went wrong :("}</p>
      ) : (
        !isUninitialized && <p>No needs founded.</p>
      )}
    </div>
  );
}
