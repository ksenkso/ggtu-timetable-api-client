import { Subject } from './Subject';
import { Cabinet } from './Cabinet';
import { Group } from './Group';
import { Teacher } from './Teacher';
import { TimetableEntryType } from './Lesson';

export interface Patch {
  id: number;
  dates: string[];
  index: number;
  type: TimetableEntryType;
  subjectId: number;
  cabinetId: number;
  groupId: number;
  cabinet: Cabinet;
  lesson: Subject;
  teachers: Teacher[];
  group?: Group;
}

export interface PatchDto {
  id?: number;
  index: number;
  type: TimetableEntryType;
  subjectId: number;
  cabinetId: number;
  groupId: number;
  teacherIds: number[];
  dates: string[];
}