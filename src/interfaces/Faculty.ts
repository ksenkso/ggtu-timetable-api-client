export interface Faculty {
  id: number;
  name: string;
}

export type FacultyCreateDto = Omit<Faculty, 'id'>;
// not using Partial here, name should be provided
export type FacultyUpdateDto = FacultyCreateDto;
