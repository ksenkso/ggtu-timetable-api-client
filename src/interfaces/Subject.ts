export interface Subject {
  id: number;
  name: string;
}

export type CreateSubjectDto = Omit<Subject, 'id'>;
// not using Partial here, name should be provided
export type UpdateSubjectDto = CreateSubjectDto;
