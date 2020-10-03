import { Subject } from './Subject';
import { Teacher } from './Teacher';
import { Cabinet } from './Cabinet';
import { Group } from './Group';

export enum Week {
  Top,
  Bottom,
}

export enum TimetableEntryType {
  Lecture,
  Practice,
  Lab,
  Empty,
}

export enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export interface Lesson {
  id?: number;
  day: Day;
  week: Week;
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

export interface LessonDto {
  id?: number;
  day: Day;
  week: Week;
  index: number;
  type: TimetableEntryType;
  subjectId: number;
  cabinetId: number;
  groupId: number;
  teacherIds: number[];
}
