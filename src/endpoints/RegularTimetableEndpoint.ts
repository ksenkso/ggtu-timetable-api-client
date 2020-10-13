import TimetableEndpoint, { LessonsEndpoint } from './TimetableEndpoint';
import { AxiosInstance } from 'axios';
import { CreateLessonDto, Lesson, UpdateLessonDto, Week } from '../interfaces';

export type RegularTimetable = {
  [Week.Top]: Record<string, (Lesson | null)[]>;
  [Week.Bottom]: Record<string, (Lesson | null)[]>;
};

export interface Lessons
  extends LessonsEndpoint<
    RegularTimetable,
    Lesson,
    CreateLessonDto,
    UpdateLessonDto
  > {}

export default class RegularTimetableEndpoint
  extends TimetableEndpoint<Lesson, CreateLessonDto, UpdateLessonDto>
  implements Lessons {
  constructor(api: AxiosInstance) {
    super(api, 'timetable');
  }
}
