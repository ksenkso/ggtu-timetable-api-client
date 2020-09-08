import Entrypoint from "./Entrypoint";
import {AxiosInstance} from "axios";
import {Teacher} from "../interfaces";

export default class TeachersEntrypoint extends Entrypoint<Teacher> {
    constructor(api: AxiosInstance) {
        super(api, 'teachers');
    }
}
