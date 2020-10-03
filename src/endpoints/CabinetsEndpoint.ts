import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import { Cabinet } from '../interfaces';
import {CreateCabinetDto, UpdateCabinetDto} from "../interfaces/Cabinet";

export default class CabinetsEndpoint extends Endpoint<Cabinet, CreateCabinetDto, UpdateCabinetDto> {
  constructor(api: AxiosInstance) {
    super(api, 'cabinets');
  }
}
