import { UserLoginDto } from '../../shared/generated/graphql';

export interface UserState {
  user: UserLoginDto | null;
  error: any;
  isLogged: boolean;
}
