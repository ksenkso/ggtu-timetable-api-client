import TimetableEndpoint from './TimetableEndpoint';
import { AxiosInstance } from 'axios';
import { CreateLessonDto, Lesson, UpdateLessonDto } from '../interfaces';

export default class RegularTimetableEndpoint extends TimetableEndpoint<
  Lesson,
  CreateLessonDto,
  UpdateLessonDto
> {
  constructor(api: AxiosInstance) {
    super(api, 'timetable');
  }
}
