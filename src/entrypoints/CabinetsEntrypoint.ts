import Entrypoint from "./Entrypoint";
import {AxiosInstance} from "axios";
import {Cabinet} from "../interfaces";

export default class CabinetsEntrypoint extends Entrypoint<Cabinet> {
    constructor(api: AxiosInstance) {
        super(api, 'cabinets');
    }
}
