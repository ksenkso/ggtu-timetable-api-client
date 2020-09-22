# GGTU Timetable API Client
This library is meat to be used as an API client for [GGTU](http://ggtu.ru/) Timetable API. 
You don't need any authorization to use read-only methods, because the data they provide is publicly accessible.
## Installation
```
$ npm i  
```
## Usage
```javascript
import ApiClient from 'ggtu-timetable-api-client';
const config = {
    baseURL: '<api_url_here>',
}
const api = new ApiClient(config);
// use the api
``` 
## Endpoints
All entrypoints extend from the `Endpoint` template class except the `AuthEndpoint`.
 - `getAll`;
 - `create`;
 - `get`;
 - `update`;
 - `delete`.
```typescript
declare class Endpoint<T> {
    protected axios: AxiosInstance;
    protected route: string;
    constructor(axios: AxiosInstance, route: string);
    getAll(): Promise<WithId<T>[]>;
    get(id: number): Promise<WithId<T>>;
    delete(id: number): Promise<number>;
    update(id: number, data: Partial<T>): Promise<WithId<T>>;
    create(data: T): Promise<WithId<T>>;
}
```
### Auth
```typescript
declare class AuthEndpoint {
    private _api;
    protected route: string;
    protected accessToken: string;
    protected refreshToken: string;
    user: User | null; 
    constructor(_api: AxiosInstance);
    login(username: string, password: string): Promise<string>;
    logout(): void;
    getProfile(): Promise<User>; 
    refresh(): Promise<void>;
    private setCredentials;
}
```

Also, there is a `TimetableEndpoint` class which is extended by `RegularTimetableEndpoint` and `PatchesEndpoint`.
```typescript
declare class TimetableEndpoint<T> extends Endpoint<T> {
    getForCabinet(cabinetId: number): Promise<T[]>;
    getForCabinetByWeek(cabinetId: number, week: Week): Promise<T[]>;
    getForGroup(groupId: number): Promise<T[]>;
    getForGroupByWeek(groupId: number, week: Week): Promise<T[]>;
    getForLesson(lessonId: number): Promise<T[]>;
    getForLessonByWeek(lessonId: number, week: Week): Promise<T[]>;
    getForTeacher(teacherId: number): Promise<T[]>;
    getForTeacherByWeek(teacherId: number, week: Week): Promise<T[]>;
}
```
