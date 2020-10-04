import { Building } from './Building';

export interface Cabinet {
  id: number;
  name: string;
  number: string;
  floor: number;
  buildingId: number;
  building?: Building;
}

export type CreateCabinetDto = Omit<Cabinet, 'id' | 'building'>;
export type UpdateCabinetDto = Partial<CreateCabinetDto>;
