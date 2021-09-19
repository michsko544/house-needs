export interface UserNeed {
  id: string;
  need: string;
  createdAt: string;
  active: boolean;
}

export interface UserNeedEdit {
  need: string;
  active: boolean;
  user_id: string;
}
