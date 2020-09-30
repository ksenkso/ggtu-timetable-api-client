import { Lesson } from './Lesson';
import { Cabinet } from './Cabinet';
import { Group } from './Group';
import { Teacher } from './Teacher';
import { TimetableEntryType } from './TimetableEntry';

export interface TimetablePatch {
  id: number;
  dates: string[];
  index: number;
  type: TimetableEntryType;
  lessonId: number;
  cabinetId: number;
  groupId: number;
  cabinet: Cabinet;
  lesson: Lesson;
  teachers: Teacher[];
  group?: Group;
}

export interface TimetablePatchDTO {
  id?: number;
  index: number;
  type: TimetableEntryType;
  lessonId: number;
  cabinetId: number;
  groupId: number;
  teacherIds: number[];
  dates: string[];
}
