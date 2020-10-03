export interface Faculty {
  id: number;
  name: string;
}

export type FacultyCreateDto = Omit<Faculty, 'id'>;
export type FacultyUpdateDto = Partial<FacultyCreateDto>;
