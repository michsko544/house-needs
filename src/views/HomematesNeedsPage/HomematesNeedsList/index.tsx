import { UserNeed } from "models/UserNeed";
import UserDropdown from "./UserDropdown";

type Props = {
  usersNeeds: UserNeed[];
};

export type UserNeedPrepared = {
  id: string;
  firstName: string;
  needs: { id: string; need: string; createdAt: string }[];
};

export default function HomematesNeedsList(props: Props): JSX.Element {
  const { usersNeeds } = props;

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
        userNeedsPrepared.push({
          id: userNeed.user.id,
          firstName: userNeed.user.first_name,
          needs: [
            {
              id: userNeed.id,
              need: userNeed.need,
              createdAt: userNeed.created_at,
            },
          ],
        });
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
      ) : (
        <p>No needs founded.</p>
      )}
    </div>
  );
}