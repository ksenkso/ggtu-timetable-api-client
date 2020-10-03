import Endpoint from './Endpoint';
import { Week } from '../interfaces';

export default class TimetableEndpoint<T, C, U> extends Endpoint<T, C, U> {
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

  getForSubject(subjectId: number): Promise<T[]> {
    return this.axios
      .get(`${this.route}/lesson/${subjectId}`)
      .then(res => res.data);
  }

  getForSubjectByWeek(subjectId: number, week: Week): Promise<T[]> {
    return this.axios
      .get(`${this.route}/lesson/${subjectId}/${week}`)
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
