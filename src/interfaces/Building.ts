import { Cabinet } from './Cabinet';

export interface Building {
  id: number;
  name: string;
  cabinets: Cabinet[];
}
