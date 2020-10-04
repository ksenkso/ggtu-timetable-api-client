import { Role } from './Role';

export interface User {
  id: number;
  username: string;
  facultyId: number;
  roles?: Role[];
}
