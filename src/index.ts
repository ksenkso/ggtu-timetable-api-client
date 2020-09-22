import CabinetsEntrypoint from './entrypoints/CabinetsEntrypoint';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import BuildingsEntrypoint from './entrypoints/BuildingsEntrypoint';
import GroupsEntrypoint from './entrypoints/GroupsEntrypoint';
import LessonsEntrypoint from './entrypoints/LessonsEntrypoint';
import PatchesEntrypoint from './entrypoints/PatchesEntrypoint';
import TeachersEntrypoint from './entrypoints/TeachersEntrypoint';
import AuthEntrypoint from './entrypoints/AuthEntrypoint';
import Entrypoint from './entrypoints/Entrypoint';
import RegularTimetableEntrypoint from './entrypoints/RegularTimetableEntrypoint';

export * from './interfaces';
type ApiEntrypoints =
  | CabinetsEntrypoint
  | BuildingsEntrypoint
  | GroupsEntrypoint
  | LessonsEntrypoint
  | RegularTimetableEntrypoint
  | PatchesEntrypoint
  | TeachersEntrypoint
  | AuthEntrypoint;

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
  public readonly cabinets: CabinetsEntrypoint;
  public readonly buildings: BuildingsEntrypoint;
  public readonly groups: GroupsEntrypoint;
  public readonly lessons: LessonsEntrypoint;
  public readonly timetable: RegularTimetableEntrypoint;
  public readonly patches: PatchesEntrypoint;
  public readonly teachers: TeachersEntrypoint;
  public readonly auth: AuthEntrypoint;
  private readonly _api: AxiosInstance;
  constructor(axiosConfig: AxiosRequestConfig) {
    this._api = axios.create(axiosConfig);
    this.cabinets = new CabinetsEntrypoint(this._api);
    this.buildings = new BuildingsEntrypoint(this._api);
    this.groups = new GroupsEntrypoint(this._api);
    this.lessons = new LessonsEntrypoint(this._api);
    this.timetable = new RegularTimetableEntrypoint(this._api);
    this.teachers = new TeachersEntrypoint(this._api);
    this.patches = new PatchesEntrypoint(this._api);
    this.auth = new AuthEntrypoint(this._api);
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

  getEntrypoint<T extends ApiEntrypoints = Entrypoint<any>>(
    entity: EntityType
  ): T {
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
