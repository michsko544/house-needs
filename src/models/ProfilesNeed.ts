import { UserNeed } from "./UserNeed";

export interface ProfilesNeed {
  firstName: string;
  id: string;
  userNeeds: UserNeed[];
}
