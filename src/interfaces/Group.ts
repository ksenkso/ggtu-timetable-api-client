import { TimetableEntry } from './TimetableEntry';

export interface Group {
  id?: number;
  name: string;
  entries?: TimetableEntry[];
}
