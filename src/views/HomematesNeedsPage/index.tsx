import ContentWithLabel from "components/ContentWithLabel";
import useUserNeeds from "hooks/useUserNeeds";
import { useSelector } from "react-redux";

import { RootState } from "store";
import HomematesNeedsList from "./HomematesNeedsList";

export default function HomematesNeedsPage(): JSX.Element {
  const house = useSelector((state: RootState) => state.auth.house);
  const userNeeds = useSelector(
    (state: RootState) => state.userNeeds.userNeeds
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_handlers, { isLoading, error }] = useUserNeeds(house?.id || "");

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
          usersNeeds={userNeeds}
          isLoading={isLoading}
          error={error}
        />
      </ContentWithLabel>
    </div>
  );
}
