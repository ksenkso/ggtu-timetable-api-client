import CabinetsEndpoint from './endpoints/CabinetsEndpoint';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import BuildingsEndpoint from './endpoints/BuildingsEndpoint';
import GroupsEndpoint from './endpoints/GroupsEndpoint';
import LessonsEndpoint from './endpoints/LessonsEndpoint';
import PatchesEndpoint from './endpoints/PatchesEndpoint';
import TeachersEndpoint from './endpoints/TeachersEndpoint';
import AuthEndpoint from './endpoints/AuthEndpoint';
import Endpoint from './endpoints/Endpoint';
import RegularTimetableEndpoint from './endpoints/RegularTimetableEndpoint';

export * from './interfaces';
type ApiEndpoints =
  | CabinetsEndpoint
  | BuildingsEndpoint
  | GroupsEndpoint
  | LessonsEndpoint
  | RegularTimetableEndpoint
  | PatchesEndpoint
  | TeachersEndpoint
  | AuthEndpoint;

export enum EntityType {
  Teacher,
  Cabinet,
  Building,
  Lesson,
  PatchEntry,
  Group,
  TimetableEntry,
}

export default class ApiClient {
  public readonly cabinets: CabinetsEndpoint;
  public readonly buildings: BuildingsEndpoint;
  public readonly groups: GroupsEndpoint;
  public readonly lessons: LessonsEndpoint;
  public readonly timetable: RegularTimetableEndpoint;
  public readonly patches: PatchesEndpoint;
  public readonly teachers: TeachersEndpoint;
  public readonly auth: AuthEndpoint;
  private readonly _api: AxiosInstance;
  constructor(axiosConfig: AxiosRequestConfig) {
    this._api = axios.create(axiosConfig);
    this.cabinets = new CabinetsEndpoint(this._api);
    this.buildings = new BuildingsEndpoint(this._api);
    this.groups = new GroupsEndpoint(this._api);
    this.lessons = new LessonsEndpoint(this._api);
    this.timetable = new RegularTimetableEndpoint(this._api);
    this.teachers = new TeachersEndpoint(this._api);
    this.patches = new PatchesEndpoint(this._api);
    this.auth = new AuthEndpoint(this._api);
    // refresh token if it has been expired
    this._api.interceptors.response.use(undefined, error => {
      if (error.config && error.response && error.response.status === 401) {
        if (error.response.name === 'TokenExpiredError') {
          return this.auth.refresh().then(() => {
            return this._api.request(error.config);
          });
        } else {
          this.auth.logout();
        }
      }
      return Promise.reject(error);
    });
  }

  getEndpoint<T extends ApiEndpoints = Endpoint<any>>(entity: EntityType): T {
    switch (entity) {
      case EntityType.Building:
        return this.buildings as T;
      case EntityType.Cabinet:
        return this.cabinets as T;
      case EntityType.Group:
        return this.groups as T;
      case EntityType.Lesson:
        return this.lessons as T;
      case EntityType.PatchEntry:
        return this.patches as T;
      case EntityType.Teacher:
        return this.teachers as T;
      case EntityType.TimetableEntry:
        return this.timetable as T;
      default:
        throw new Error('no entrypoint for key ' + entity);
    }
  }
}
