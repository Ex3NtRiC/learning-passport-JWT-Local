import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  // @UseGuards()
  @Post('auth/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    console.log('REq');
    return this.authService.login(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('hello')
  postHello(@Body('name') name: string) {
    return this.appService.postHello(name);
  }
}
