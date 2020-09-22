import Entrypoint from './Entrypoint';
import { Week } from '../interfaces/TimetableEntry';

export default class TimetableEntrypoint<T> extends Entrypoint<T> {
  getForCabinet(cabinetId: number): Promise<T[]> {
    return this.axios
      .get(`${this.route}/cabinet/${cabinetId}`)
      .then(res => res.data);
  }

  getForCabinetByWeek(cabinetId: number, week: Week): Promise<T[]> {
    return this.axios
      .get(`${this.route}/cabinet/${cabinetId}/${week}`)
      .then(res => res.data);
  }

  getForGroup(groupId: number): Promise<T[]> {
    return this.axios
      .get(`${this.route}/group/${groupId}`)
      .then(res => res.data);
  }

  getForGroupByWeek(groupId: number, week: Week): Promise<T[]> {
    return this.axios
      .get(`${this.route}/group/${groupId}/${week}`)
      .then(res => res.data);
  }

  getForLesson(lessonId: number): Promise<T[]> {
    return this.axios
      .get(`${this.route}/lesson/${lessonId}`)
      .then(res => res.data);
  }

  getForLessonByWeek(lessonId: number, week: Week): Promise<T[]> {
    return this.axios
      .get(`${this.route}/lesson/${lessonId}/${week}`)
      .then(res => res.data);
  }

  getForTeacher(teacherId: number): Promise<T[]> {
    return this.axios
      .get(`${this.route}/teacher/${teacherId}`)
      .then(res => res.data);
  }

  getForTeacherByWeek(teacherId: number, week: Week): Promise<T[]> {
    return this.axios
      .get(`${this.route}/teacher/${teacherId}/${week}`)
      .then(res => res.data);
  }
}
