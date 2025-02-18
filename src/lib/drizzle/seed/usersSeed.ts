import { UserTableInsert } from '../table';
// import { addedAt, userToumkuAdminId } from '../staticIds';

export type UserSeed = Omit<UserTableInsert, 'id'> & { id: string };

export const usersSeed: UserSeed[] = [
  {
    id: 'ef006740-6d40-44f9-9505-6e549b8c2983',
    username: 'a1',
    password: '$2a$10$nWBalfvME1/lzG5mxsbNZezqr5XqAdEIboxcxoBj7.eJfaznVVK8O',
  },
  {
    id: 'ef006740-6d40-44f9-9505-6e549b8c2983',
    username: 'admin',
    password: '$2a$10$nWBalfvME1/lzG5mxsbNZezqr5XqAdEIboxcxoBj7.eJfaznVVK8O',
  },
]