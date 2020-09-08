import Entrypoint from "./Entrypoint";
import {AxiosInstance} from "axios";
import {Group} from "../interfaces";

export default class GroupsEntrypoint extends Entrypoint<Group> {
    constructor(api: AxiosInstance) {
        super(api, 'groups');
    }
}
