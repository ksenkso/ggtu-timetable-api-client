import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import { Subject } from '../interfaces';

export default class LessonsEndpoint extends Endpoint<Subject> {
  constructor(api: AxiosInstance) {
    super(api, 'lessons');
  }
}
