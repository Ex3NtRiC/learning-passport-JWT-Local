import { Injectable } from '@nestjs/common';
import { AppType } from './app.type';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World';
  }

  postHello(name): string {
    return `Hello ${name}`;
  }

  getHelloGQL(): AppType {
    return { result: 'Hello World' };
  }

  postHelloGQL(name): AppType {
    // return `Hello ${name}`;
    return { result: name };
  }
}
