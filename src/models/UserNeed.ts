export interface UserNeed {
  id: string;
  need: string;
  created_at: string;
  user: {
    first_name: string;
    id: string;
    created_at: string;
  };
}
