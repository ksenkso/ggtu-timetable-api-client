import Endpoint, { ApiEndpoint } from './Endpoint';
import { Week } from '../interfaces';

export interface LessonsEndpoint<R, T, C, U> extends ApiEndpoint<T, C, U> {
  getForCabinet(cabinetId: number): Promise<R>;

  getForCabinetByWeek(cabinetId: number, week: Week): Promise<R>;

  getForGroup(groupId: number): Promise<R>;

  getForGroupByWeek(groupId: number, week: Week): Promise<R>;

  getForSubject(subjectId: number): Promise<R>;

  getForSubjectByWeek(subjectId: number, week: Week): Promise<R>;

  getForTeacher(teacherId: number): Promise<R>;

  getForTeacherByWeek(teacherId: number, week: Week): Promise<R>;
}

export default class TimetableEndpoint<T, C, U> extends Endpoint<T, C, U>
  implements LessonsEndpoint<any, T, C, U> {
  getForCabinet(cabinetId: number): Promise<any> {
    return this.axios
      .get(`${this.route}/cabinet/${cabinetId}`)
      .then(res => res.data);
  }

  getForCabinetByWeek(cabinetId: number, week: Week): Promise<any> {
    return this.axios
      .get(`${this.route}/cabinet/${cabinetId}/${week}`)
      .then(res => res.data);
  }

  getForGroup(groupId: number): Promise<any> {
    return this.axios
      .get(`${this.route}/group/${groupId}`)
      .then(res => res.data);
  }

  getForGroupByWeek(groupId: number, week: Week): Promise<any> {
    return this.axios
      .get(`${this.route}/group/${groupId}/${week}`)
      .then(res => res.data);
  }

  getForSubject(subjectId: number): Promise<any> {
    return this.axios
      .get(`${this.route}/lesson/${subjectId}`)
      .then(res => res.data);
  }

  getForSubjectByWeek(subjectId: number, week: Week): Promise<any> {
    return this.axios
      .get(`${this.route}/lesson/${subjectId}/${week}`)
      .then(res => res.data);
  }

  getForTeacher(teacherId: number): Promise<any> {
    return this.axios
      .get(`${this.route}/teacher/${teacherId}`)
      .then(res => res.data);
  }

  getForTeacherByWeek(teacherId: number, week: Week): Promise<any> {
    return this.axios
      .get(`${this.route}/teacher/${teacherId}/${week}`)
      .then(res => res.data);
  }
}
