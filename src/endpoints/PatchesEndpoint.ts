import { AxiosInstance } from 'axios';
import TimetableEndpoint, { LessonsEndpoint } from './TimetableEndpoint';
import { CreatePatchDto, Patch, UpdatePatchDto } from '../interfaces';

export interface Patches
  extends LessonsEndpoint<Patch[], Patch, CreatePatchDto, UpdatePatchDto> {}

export default class PatchesEndpoint
  extends TimetableEndpoint<Patch, CreatePatchDto, UpdatePatchDto>
  implements Patches {
  constructor(api: AxiosInstance) {
    super(api, 'patches');
  }
}
