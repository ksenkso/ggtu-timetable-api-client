import { AxiosInstance } from 'axios';
import TimetableEndpoint from './TimetableEndpoint';
import { TimetablePatch, TimetablePatchDTO } from '../interfaces';

export default class PatchesEndpoint extends TimetableEndpoint<
  TimetablePatch,
  TimetablePatchDTO
> {
  constructor(api: AxiosInstance) {
    super(api, 'patches');
  }
}
