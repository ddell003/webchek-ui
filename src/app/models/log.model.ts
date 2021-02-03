export interface Log {
  id: string;
  latest:number;
  message:string;
  status:string;
  test_id:string;
  created_at?:string;
  updated_at?:string;
}
