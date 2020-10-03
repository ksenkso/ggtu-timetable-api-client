import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import {
  Faculty,
  FacultyCreateDto,
  FacultyUpdateDto,
} from '../interfaces/Faculty';

export default class FacultiesEndpoint extends Endpoint<
  Faculty,
  FacultyCreateDto,
  FacultyUpdateDto
> {
  constructor(api: AxiosInstance) {
    super(api, 'faculties');
  }
}
