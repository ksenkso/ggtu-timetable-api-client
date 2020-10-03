import { Cabinet } from './Cabinet';

export interface Building {
  id: number;
  name: string;
  cabinets?: Cabinet[];
}

export type CreateBuildingDto = Omit<Building, 'id' | 'cabinets'>;
export type UpdateBuildingDto = CreateBuildingDto;
