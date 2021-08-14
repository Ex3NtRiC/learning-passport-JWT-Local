import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { of } from 'rxjs';
import { AppService } from './app.service';
import { AppType } from './app.type';
import { AuthService } from './auth/auth.service';
import { AuthType } from './auth/auth.type';
import { CurrentUser } from './auth/current-user.decorator';
import { GetRequest } from './auth/get-request.decorator';
import { GqlJwtAuthGuard } from './auth/graphql-jwt-auth.guard';
import { GqlLocalAuthGuard } from './auth/graphql-local-auth.guard';
import { GqlRolesGuard } from './auth/graphql-roles.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RoleType } from './auth/role.type';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/roles.enum';
import { UserType } from './users/user.type';
import { User, UsersService } from './users/users.service';

@Resolver((of) => AppType)
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(GqlJwtAuthGuard, GqlRolesGuard)
  @Query((returns) => AppType)
  getHelloGQL() {
    return this.appService.getHelloGQL();
  }

  @Query((returns) => AppType)
  postHelloGQL(@Args('name') name: string) {
    return this.appService.postHelloGQL(name);
  }

  @Mutation((returns) => AuthType)
  @UseGuards(GqlLocalAuthGuard)
  async loginGQL(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    console.log('it worked');
    const access_token = await this.authService.loginGQL(username);
    console.log(access_token);
    return access_token;
  }

  @Query((returns) => UserType)
  @UseGuards(GqlJwtAuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user;
    // const u = await this.usersService.findOne(user.username);
    // return u;
  }
}
