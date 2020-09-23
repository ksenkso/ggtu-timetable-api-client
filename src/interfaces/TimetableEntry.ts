import { Lesson } from './Lesson';
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
}

export enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export interface TimetableEntry {
  id?: number;
  day: Day;
  week: Week;
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

export interface TimetableEntryDTO {
  id?: number;
  day: Day;
  week: Week;
  index: number;
  type: TimetableEntryType;
  lessonId: number;
  cabinetId: number;
  groupId: number;
  teacherIds: number[];
}
