export enum Role {
  Admin = 'Admin',
  User = 'User',
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
}
