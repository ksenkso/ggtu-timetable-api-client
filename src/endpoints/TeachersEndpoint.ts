import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import { Teacher } from '../interfaces';
import { CreateTeacherDto, UpdateTeacherDto } from '../interfaces/Teacher';

export default class TeachersEndpoint extends Endpoint<
  Teacher,
  CreateTeacherDto,
  UpdateTeacherDto
> {
  constructor(api: AxiosInstance) {
    super(api, 'teachers');
  }
}
