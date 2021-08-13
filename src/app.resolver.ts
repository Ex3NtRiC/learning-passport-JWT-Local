import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AppService } from './app.service';
import { AppType } from './app.type';
import { AuthService } from './auth/auth.service';
import { AuthType } from './auth/auth.type';
import { CurrentUser } from './auth/current-user.decorator';
import { GqlJwtAuthGuard } from './auth/graphql-jwt-auth.guard';
import { GqlRolesGuard } from './auth/graphql-roles.guard';
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

  @Roles(Role.User)
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
  async loginGQL(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    console.log('req.user:');
    const access_token = await this.authService.loginGQL(username, password);
    console.log(access_token);
    return access_token;
  }

  @Query((returns) => UserType)
  @UseGuards(GqlJwtAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.usersService.findOne(user.username);
  }
}
