import { Test } from './test.model';

export interface Site {
  name: string;
  status: number;
  id: number;
  tests?: Test[];
}
