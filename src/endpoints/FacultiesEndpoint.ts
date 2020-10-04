import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import {
  Faculty,
  CreateFacultyDto,
  UpdateFacultyDto,
} from '../interfaces/Faculty';

export default class FacultiesEndpoint extends Endpoint<
  Faculty,
  CreateFacultyDto,
  UpdateFacultyDto
> {
  constructor(api: AxiosInstance) {
    super(api, 'faculties');
  }
}
