import { User } from "./User";
import { UserNeed } from "./UserNeed";

export interface ProfilesNeed extends User {
  userNeeds: UserNeed[];
}
