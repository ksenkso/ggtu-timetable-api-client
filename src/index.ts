import CabinetsEndpoint from './endpoints/CabinetsEndpoint';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import BuildingsEndpoint from './endpoints/BuildingsEndpoint';
import GroupsEndpoint from './endpoints/GroupsEndpoint';
import SubjectsEndpoint from './endpoints/SubjectsEndpoint';
import PatchesEndpoint from './endpoints/PatchesEndpoint';
import TeachersEndpoint from './endpoints/TeachersEndpoint';
import AuthEndpoint from './endpoints/AuthEndpoint';
import Endpoint from './endpoints/Endpoint';
import RegularTimetableEndpoint from './endpoints/RegularTimetableEndpoint';
import SpecializationsEndpoint from './endpoints/SpecializationsEndpoint';
import FacultiesEndpoint from './endpoints/FacultiesEndpoint';

export * from './interfaces';
type ApiEndpoints =
  | CabinetsEndpoint
  | BuildingsEndpoint
  | GroupsEndpoint
  | SubjectsEndpoint
  | RegularTimetableEndpoint
  | PatchesEndpoint
  | TeachersEndpoint
  | SpecializationsEndpoint
  | FacultiesEndpoint
  | AuthEndpoint;

export enum EntityType {
  Teacher,
  Cabinet,
  Building,
  Subject,
  Patch,
  Group,
  Lesson,
  Faculty,
  Specialization,
}

export default class ApiClient {
  public readonly cabinets: CabinetsEndpoint;
  public readonly buildings: BuildingsEndpoint;
  public readonly groups: GroupsEndpoint;
  public readonly subjects: SubjectsEndpoint;
  public readonly timetable: RegularTimetableEndpoint;
  public readonly patches: PatchesEndpoint;
  public readonly teachers: TeachersEndpoint;
  public readonly auth: AuthEndpoint;
  public readonly specs: SpecializationsEndpoint;
  public readonly faculties: FacultiesEndpoint;
  private readonly _api: AxiosInstance;

  constructor(axiosConfig: AxiosRequestConfig) {
    this._api = axios.create(axiosConfig);
    this.cabinets = new CabinetsEndpoint(this._api);
    this.buildings = new BuildingsEndpoint(this._api);
    this.groups = new GroupsEndpoint(this._api);
    this.subjects = new SubjectsEndpoint(this._api);
    this.timetable = new RegularTimetableEndpoint(this._api);
    this.teachers = new TeachersEndpoint(this._api);
    this.patches = new PatchesEndpoint(this._api);
    this.auth = new AuthEndpoint(this._api);
    this.specs = new SpecializationsEndpoint(this._api);
    this.faculties = new FacultiesEndpoint(this._api);
    // refresh token if it has been expired
    this._api.interceptors.response.use(undefined, error => {
      if (error.config && error.response) {
        if (error.response.status === 401) {
          if (
            error.response.data &&
            error.response.data.name === 'TokenExpiredError'
          ) {
            return this.auth.refresh().then(() => {
              return this._api.request(error.config);
            });
          } else {
            this.auth.logout();
          }
        } else {
          return Promise.reject(error.response.data);
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
      case EntityType.Subject:
        return this.subjects as T;
      case EntityType.Patch:
        return this.patches as T;
      case EntityType.Teacher:
        return this.teachers as T;
      case EntityType.Lesson:
        return this.timetable as T;
      case EntityType.Specialization:
        return this.specs as T;
      case EntityType.Faculty:
        return this.faculties as T;
      default:
        throw new Error('no entrypoint for key ' + entity);
    }
  }
}
