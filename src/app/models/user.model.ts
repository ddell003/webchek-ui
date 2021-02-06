export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: string;
  updated_at: string;
  api_token: string;
  owner: string;
  app_id: string;
}
