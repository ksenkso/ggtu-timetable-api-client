import {TimetableEntry} from './TimetableEntry';

export interface Teacher {
  id?: number;
  name: string;
  lessons?: TimetableEntry;
}
