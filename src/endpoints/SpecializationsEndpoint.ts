import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import {
  CreateSpecializationDto,
  Specialization,
  UpdateSpecializationDto,
} from '../interfaces/Specialization';

export default class SpecializationsEndpoint extends Endpoint<
  Specialization,
  CreateSpecializationDto,
  UpdateSpecializationDto
> {
  constructor(api: AxiosInstance) {
    super(api, 'specializations');
  }
}
