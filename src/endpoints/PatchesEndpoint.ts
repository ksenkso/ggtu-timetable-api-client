import { AxiosInstance } from 'axios';
import TimetableEndpoint from './TimetableEndpoint';
import { CreatePatchDto, Patch, UpdatePatchDto } from '../interfaces';

export default class PatchesEndpoint extends TimetableEndpoint<
  Patch,
  CreatePatchDto,
  UpdatePatchDto
> {
  constructor(api: AxiosInstance) {
    super(api, 'patches');
  }
}
