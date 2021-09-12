export interface UserNeed {
  id: string;
  need: string;
  created_at: string;
  active: boolean;
  user: {
    first_name: string;
    id: string;
    created_at: string;
  };
}

export interface UserNeedEdit {
  need: string;
  active: boolean;
  user_id: string;
  house_id: string;
}
