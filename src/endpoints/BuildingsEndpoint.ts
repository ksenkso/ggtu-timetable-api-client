import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import { Building } from '../interfaces';
import {CreateBuildingDto, UpdateBuildingDto} from "../interfaces/Building";

export default class BuildingsEndpoint extends Endpoint<Building, CreateBuildingDto, UpdateBuildingDto> {
  constructor(api: AxiosInstance) {
    super(api, 'buildings');
  }
}
