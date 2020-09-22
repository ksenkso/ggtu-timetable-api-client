import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import { Lesson } from '../interfaces';

export default class LessonsEndpoint extends Endpoint<Lesson> {
  constructor(api: AxiosInstance) {
    super(api, 'lessons');
  }
}
