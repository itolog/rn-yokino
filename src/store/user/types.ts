import { UserLoginDto } from '../../shared/generated/graphql';

export interface UserState {
  user: UserLoginDto | {};
  error: any;
  isLogged: boolean;
}
