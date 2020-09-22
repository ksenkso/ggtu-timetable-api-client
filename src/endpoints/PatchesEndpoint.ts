import { AxiosInstance } from 'axios';
import TimetableEndpoint from './TimetableEndpoint';
import { TimetablePatch } from '../interfaces';

export default class PatchesEndpoint extends TimetableEndpoint<TimetablePatch> {
  constructor(api: AxiosInstance) {
    super(api, 'timetable');
  }
}
