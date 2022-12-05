import { User } from "./User";

export interface UserNeed {
  id: string;
  need: string;
  createdAt: string;
  active: boolean;
  needUrl: string;
  sponsor: null | User;
}

export interface UserNeedEdit {
  need: string;
  active: boolean;
  user_id: string;
}
