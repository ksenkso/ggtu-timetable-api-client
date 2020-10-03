import { AxiosInstance } from 'axios';
import TimetableEndpoint from './TimetableEndpoint';
import { Patch, PatchDto } from '../interfaces';

export default class PatchesEndpoint extends TimetableEndpoint<
  Patch,
  PatchDto
> {
  constructor(api: AxiosInstance) {
    super(api, 'patches');
  }
}
