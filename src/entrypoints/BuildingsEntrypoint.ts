import Entrypoint from "./Entrypoint";
import {AxiosInstance} from "axios";
import {Building} from "../interfaces";

export default class BuildingsEntrypoint extends Entrypoint<Building> {
    constructor(api: AxiosInstance) {
        super(api, 'buildings');
    }
}
