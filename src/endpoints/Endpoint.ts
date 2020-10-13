import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { WithId } from '../interfaces';
import RequestBuilder from '../utils/RequestBuilder';
import RequestConfig from '../interfaces/RequestConfig';

export interface ApiEndpoint<T, C, U> {
  getAll(config?: RequestConfig): Promise<WithId<T>[]>;

  get(id: number, config?: RequestConfig): Promise<WithId<T>>;

  delete(id: number, config?: RequestConfig): Promise<number>;

  update(
    id: number,
    data: Partial<U>,
    config?: RequestConfig
  ): Promise<WithId<T>>;

  create(data: C, config?: RequestConfig): Promise<WithId<T>>;
}

export default class Endpoint<T, C = T, U = C> implements ApiEndpoint<T, C, U> {
  constructor(protected axios: AxiosInstance, protected route: string) {}

  protected _getAll(config: AxiosRequestConfig) {
    return this.axios
      .get(this.route, config)
      .then(res => res.data as WithId<T>[]);
  }

  protected _get(id: number, config: AxiosRequestConfig) {
    return this.axios
      .get(`${this.route}/${id}`, config)
      .then(res => res.data as WithId<T>);
  }

  protected _delete(id: number, config: AxiosRequestConfig) {
    return this.axios
      .delete(`${this.route}/${id}`, config)
      .then(res => res.data as number);
  }

  protected _update(id: number, data: Partial<U>, config: AxiosRequestConfig) {
    return this.axios
      .patch(`${this.route}/${id}`, data, config)
      .then(res => res.data as WithId<T>);
  }

  protected _create(data: C, config: AxiosRequestConfig) {
    return this.axios
      .post(this.route, data, config)
      .then(res => res.data as WithId<T>);
  }

  getAll(config?: RequestConfig): Promise<WithId<T>[]> {
    const builder = new RequestBuilder(config);
    return this._getAll(builder.getConfig());
  }

  get(id: number, config?: RequestConfig): Promise<WithId<T>> {
    const builder = new RequestBuilder(config);
    return this._get(id, builder.getConfig());
  }

  delete(id: number, config?: RequestConfig): Promise<number> {
    const builder = new RequestBuilder(config);
    return this._delete(id, builder.getConfig());
  }

  update(
    id: number,
    data: Partial<U>,
    config?: RequestConfig
  ): Promise<WithId<T>> {
    const builder = new RequestBuilder(config);
    return this._update(id, data, builder.getConfig());
  }

  create(data: C, config?: RequestConfig): Promise<WithId<T>> {
    const builder = new RequestBuilder(config);
    return this._create(data, builder.getConfig());
  }
}
