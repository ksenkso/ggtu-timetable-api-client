import Entrypoint from "./Entrypoint";
import {Week} from "../interfaces/TimetableEntry";

export default class TimetableEntrypoint<T> extends Entrypoint<T> {

    getForCabinet(cabinetId: number): Promise<T[]> {
        return this.axios.get(`${this.route}/cabinet/${cabinetId}`);
    }

    getForCabinetByWeek(cabinetId: number, week: Week): Promise<T[]> {
        return this.axios.get(`${this.route}/cabinet/${cabinetId}/${week}`);
    }

    getForGroup(groupId: number): Promise<T[]> {
        return this.axios.get(`${this.route}/group/${groupId}`);
    }

    getForGroupByWeek(groupId: number, week: Week): Promise<T[]> {
        return this.axios.get(`${this.route}/group/${groupId}/${week}`);
    }

    getForLesson(lessonId: number): Promise<T[]> {
        return this.axios.get(`${this.route}/lesson/${lessonId}`);
    }

    getForLessonByWeek(lessonId: number, week: Week): Promise<T[]> {
        return this.axios.get(`${this.route}/lesson/${lessonId}/${week}`);
    }

    getForTeacher(teacherId: number): Promise<T[]> {
        return this.axios.get(`${this.route}/teacher/${teacherId}`);
    }

    getForTeacherByWeek(teacherId: number, week: Week): Promise<T[]> {
        return this.axios.get(`${this.route}/teacher/${teacherId}/${week}`);
    }
}
