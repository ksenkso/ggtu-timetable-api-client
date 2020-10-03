import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import { Group } from '../interfaces';
import { GroupCreateDto, GroupUpdateDto } from '../interfaces/Group';

export default class GroupsEndpoint extends Endpoint<
  Group,
  GroupCreateDto,
  GroupUpdateDto
> {
  constructor(api: AxiosInstance) {
    super(api, 'groups');
  }
}
