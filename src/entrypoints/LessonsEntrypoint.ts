import Entrypoint from './Entrypoint';
import { AxiosInstance } from 'axios';
import { Lesson } from '../interfaces';

export default class LessonsEntrypoint extends Entrypoint<Lesson> {
  constructor(api: AxiosInstance) {
    super(api, 'lessons');
  }
}
