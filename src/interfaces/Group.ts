import { Lesson } from './Lesson';
import {Specialization} from "./Specialization";
import {Faculty} from "./Faculty";

export interface Group {
  id?: number;
  name: string;
  facultyId: number;
  specializationId: number;
  entries?: Lesson[];
  specialization: Specialization;
  faculty: Faculty;
}
