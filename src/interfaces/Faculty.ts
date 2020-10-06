export interface Faculty {
  id: number;
  name: string;
}

export type CreateFacultyDto = Omit<Faculty, 'id'>;
// not using Partial here, name should be provided
export type UpdateFacultyDto = CreateFacultyDto & { id?: number };
