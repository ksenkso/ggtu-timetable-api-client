import TimetableEntrypoint from "./TimetableEntrypoint";
import {AxiosInstance} from "axios";
import {TimetableEntry} from "../interfaces";

export default class RegularTimetableEntrypoint extends TimetableEntrypoint<TimetableEntry> {
    constructor(api: AxiosInstance) {
        super(api, 'timetable');
    }
}
