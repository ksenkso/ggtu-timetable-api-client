import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import { Teacher } from '../interfaces';

export default class TeachersEndpoint extends Endpoint<Teacher> {
  constructor(api: AxiosInstance) {
    super(api, 'teachers');
  }
}
