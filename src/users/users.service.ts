import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/roles.enum';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      roles: [Role.Admin],
    },
    {
      userId: 2,
      username: 'laith',
      password: 'lulu',
      roles: [Role.User],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    console.log('findOne');
    return this.users.find((user) => user.username === username);
  }
}
