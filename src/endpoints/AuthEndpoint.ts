import { AxiosInstance } from 'axios';
import { User } from '../interfaces';

export const GGTU_TOKENS_STORAGE_KEY = `ggtu_api/tokens`;
export interface ApiCredentials {
  accessToken: string;
  refreshToken: string;
}
export default class AuthEndpoint {
  protected route = 'auth';
  protected accessToken = '';
  protected refreshToken = '';
  public user: Omit<User, 'facultyId'> | null = null;

  constructor(private _api: AxiosInstance) {
    let tokens: any = localStorage.getItem(GGTU_TOKENS_STORAGE_KEY);
    if (tokens) {
      tokens = JSON.parse(tokens) as ApiCredentials;
      this.setCredentials(tokens);
    }
  }

  login(username: string, password: string): Promise<void> {
    return this._api
      .post(this.route + '/login', { username, password })
      .then(res => {
        this.setCredentials(res.data);
      });
  }

  logout() {
    this.user = null;
    this.accessToken = '';
    this.refreshToken = '';
    localStorage.removeItem(GGTU_TOKENS_STORAGE_KEY);
    delete this._api.defaults.headers['Authorization'];
  }

  getProfile(): Promise<User> {
    return this._api.get(this.route + '/profile').then(res => res.data as User);
  }

  refresh(): Promise<void> {
    return this._api
      .get(this.route + '/refresh', {
        params: { refreshToken: this.refreshToken },
      })
      .then(res => {
        this.setCredentials(res.data as ApiCredentials);
      });
  }

  private setCredentials({ accessToken, refreshToken }: ApiCredentials) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this._api.defaults.headers['Authorization'] = 'Bearer ' + accessToken;
    const { username, sub } = JSON.parse(atob(accessToken.split('.')[1]));
    localStorage.setItem(GGTU_TOKENS_STORAGE_KEY, JSON.stringify({ accessToken, refreshToken }));
    this.user = {
      username,
      id: sub,
    };
  }
}
