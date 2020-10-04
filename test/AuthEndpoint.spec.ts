import ApiClient from '../src';
import { GGTU_TOKENS_STORAGE_KEY } from '../src/endpoints/AuthEndpoint';

describe('AuthEndpoint', function() {
  let api: ApiClient;
  beforeAll(() => {
    api = new ApiClient({ baseURL: process.env.API_URL });
  });

  it('should login a user', function() {
    return api.auth.login('root', 'root').then(() => {
      expect(api.auth.user).not.toBeNull();
      expect(api.auth.user?.username).toEqual('root');
      expect(api.auth.user?.id).toBeDefined();
    });
  });

  it('should fetch a profile for current user', function() {
    return api.auth
      .login('root', 'root')
      .then(() => {
        expect(localStorage.setItem).toHaveBeenCalled();
        localStorage.getItem(GGTU_TOKENS_STORAGE_KEY);
        expect(localStorage[GGTU_TOKENS_STORAGE_KEY]).toBeDefined();
        return api.auth.getProfile();
      })
      .then(user => {
        expect(user).toBeDefined();
        expect(user.username).toEqual('root');
        expect(user.id).toBeDefined();
        expect(user.facultyId).toBeDefined();
      });
  });

  it('should refresh api access token', function() {
    return api.auth.login('root', 'root').then(() => {
      const authData = localStorage.getItem(GGTU_TOKENS_STORAGE_KEY);
      expect(authData).toBeTruthy();
      if (authData) {
        const { accessToken } = JSON.parse(authData);
        // wait 2 seconds so the access token will have a different timestamp
        return new Promise<void>(resolve => {
          setTimeout(() => {
            api.auth
              .refresh()
              .then(() => {
                const newAuthData = localStorage.getItem(
                  GGTU_TOKENS_STORAGE_KEY
                );
                expect(newAuthData).toBeTruthy();
                if (newAuthData) {
                  const newAccessToken = JSON.parse(newAuthData).accessToken;
                  expect(accessToken).not.toEqual(newAccessToken);
                }
              })
              .then(resolve);
          }, 2000);
        });
      } else {
        return Promise.reject();
      }
    });
  });

  it('should logout current user', function() {
    return api.auth.login('root', 'root').then(() => {
      expect(api.auth.user).not.toBeNull();
      api.auth.logout();
      expect(api.auth.user).toBeNull();
      expect(localStorage.getItem(GGTU_TOKENS_STORAGE_KEY)).toBeFalsy();
    });
  });
});
