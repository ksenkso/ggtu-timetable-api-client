import TimetableEndpoint from './TimetableEndpoint';
import { AxiosInstance } from 'axios';
import { Lesson, LessonDto } from '../interfaces';

export default class RegularTimetableEndpoint extends TimetableEndpoint<
  Lesson,
  LessonDto
> {
  constructor(api: AxiosInstance) {
    super(api, 'timetable');
  }
}
