import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import { Cabinet } from '../interfaces';

export default class CabinetsEndpoint extends Endpoint<Cabinet> {
  constructor(api: AxiosInstance) {
    super(api, 'cabinets');
  }
}
