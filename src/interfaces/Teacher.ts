import { Lesson } from './Lesson';

export interface Teacher {
  id: number;
  name: string;
  lessons?: Lesson;
}

export type CreateTeacherDto = Omit<Teacher, 'id' | 'lessons'>;
// not using Partial here, name should be provided
export type UpdateTeacherDto = CreateTeacherDto;
