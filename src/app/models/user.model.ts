export interface User {
  id: number;
  name: string;
  password?:string;
  created_at: string;
  updated_at: string;
  api_token: string;
  owner:number;

}
