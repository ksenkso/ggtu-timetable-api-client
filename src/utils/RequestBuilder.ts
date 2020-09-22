import { AxiosRequestConfig } from 'axios';
import RequestConfig from '../interfaces/RequestConfig';

export default class RequestBuilder {
  private config: AxiosRequestConfig = {};

  constructor(inputConfig?: RequestConfig) {
    if (inputConfig) {
      this.buildWith(inputConfig);
    }
  }

  with(entities: string[]) {
    this.config.params.with = this.config.params.with
      ? this.config.params.with.concat(entities)
      : entities;
  }

  getConfig(): AxiosRequestConfig {
    return this.config;
  }

  buildWith(config: RequestConfig) {
    if (config.entities) {
      this.with(config.entities);
    }
  }
}
