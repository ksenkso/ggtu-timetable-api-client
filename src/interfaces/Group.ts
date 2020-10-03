import { Lesson } from './Lesson';
import { Specialization } from './Specialization';
import { Faculty } from './Faculty';

export interface Group {
  id: number;
  name: string;
  entranceYear: number;
  facultyId: number;
  specializationId: number;
  entries: Lesson[];
  specialization: Specialization;
  faculty: Faculty;
}

export type GroupCreateDto = Omit<
  Group,
  'id' | 'entries' | 'specialization' | 'faculty'
>;
export type GroupUpdateDto = GroupCreateDto;
