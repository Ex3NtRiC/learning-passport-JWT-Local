import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthType } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('validate User');
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginGQL(username: string, password: string): Promise<AuthType> {
    const result = await this.validateUser(username, password);
    if (!result) {
      throw new UnauthorizedException();
    }
    const payload = { username: result.username, sub: result.userId };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
