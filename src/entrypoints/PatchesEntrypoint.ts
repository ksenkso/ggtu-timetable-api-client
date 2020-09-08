import {AxiosInstance} from "axios";
import TimetableEntrypoint from "./TimetableEntrypoint";
import {TimetablePatch} from "../interfaces";

export default class PatchesEntrypoint extends TimetableEntrypoint<TimetablePatch> {
    constructor(api: AxiosInstance) {
        super(api, 'timetable');
    }
}
