import { Subject } from './Subject';
import { Cabinet } from './Cabinet';
import { Group } from './Group';
import { Teacher } from './Teacher';
import { LessonType } from './Lesson';

export interface Patch {
  id: number;
  dates: string[];
  index: number;
  type: LessonType;
  subjectId: number;
  cabinetId: number;
  groupId: number;
  cabinet: Cabinet;
  subject: Subject;
  teachers: Teacher[];
  group?: Group;
}

export type CreatePatchDto = Omit<
  Patch,
  'id' | 'cabinet' | 'subject' | 'teachers' | 'group'
> & { teacherIds: number[] };
export type UpdatePatchDto = Partial<CreatePatchDto>;
