import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import { Building } from '../interfaces';

export default class BuildingsEndpoint extends Endpoint<Building> {
  constructor(api: AxiosInstance) {
    super(api, 'buildings');
  }
}
