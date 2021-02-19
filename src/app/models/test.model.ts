import { Log } from "./log.model";
import { User } from "./user.model";

export interface Test {
  id: string;
  app_id:number;
  name:string;
  created_at:string;
  curl:string;
  expected_status_code:string;
  frequency:string;
  frequency_amount:string;
  url:string;
  latest?:Log;
  users?:User[];
  logs?:[];

}
