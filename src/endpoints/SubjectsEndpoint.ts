import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import { Subject } from '../interfaces';
import { CreateSubjectDto, UpdateSubjectDto } from '../interfaces/Subject';

export default class SubjectsEndpoint extends Endpoint<
  Subject,
  CreateSubjectDto,
  UpdateSubjectDto
> {
  constructor(api: AxiosInstance) {
    super(api, 'subjects');
  }
}
