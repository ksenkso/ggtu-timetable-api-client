import { Lesson } from './Lesson';

export interface Teacher {
  id?: number;
  name: string;
  lessons?: Lesson;
}
