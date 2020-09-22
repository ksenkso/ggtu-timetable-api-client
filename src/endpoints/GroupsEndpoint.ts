import Endpoint from './Endpoint';
import { AxiosInstance } from 'axios';
import { Group } from '../interfaces';

export default class GroupsEndpoint extends Endpoint<Group> {
  constructor(api: AxiosInstance) {
    super(api, 'groups');
  }
}
