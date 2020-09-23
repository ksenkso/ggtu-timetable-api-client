import TimetableEndpoint from './TimetableEndpoint';
import { AxiosInstance } from 'axios';
import { TimetableEntry, TimetableEntryDTO } from '../interfaces';

export default class RegularTimetableEndpoint extends TimetableEndpoint<
  TimetableEntry,
  TimetableEntryDTO
> {
  constructor(api: AxiosInstance) {
    super(api, 'timetable');
  }
}
