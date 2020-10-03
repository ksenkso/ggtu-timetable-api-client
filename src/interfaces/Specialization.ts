export interface Specialization {
  id: number;
  name: string;
  code: string;
}

export type CreateSpecializationDto = Omit<Specialization, 'id'>;
export type UpdateSpecializationDto = Partial<CreateSpecializationDto>;
