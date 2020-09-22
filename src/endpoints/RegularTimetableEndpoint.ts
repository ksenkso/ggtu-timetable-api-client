import TimetableEndpoint from './TimetableEndpoint';
import { AxiosInstance } from 'axios';
import { TimetableEntry } from '../interfaces';

export default class RegularTimetableEndpoint extends TimetableEndpoint<
  TimetableEntry
> {
  constructor(api: AxiosInstance) {
    super(api, 'timetable');
  }
}
