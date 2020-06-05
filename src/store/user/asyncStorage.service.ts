import AsyncStorage from '@react-native-community/async-storage';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserLoginDto } from '../../shared/generated/graphql';

class AsyncStorageService {
  private readonly user_key = '@user';

  setUser(user: UserLoginDto) {
    const data = JSON.stringify(user);
    return from(AsyncStorage.setItem(this.user_key, data));
  }

  getUser() {
    return from(AsyncStorage.getItem(this.user_key)).pipe(
      map(res => {
        if (!res) return null;
        return JSON.parse(res);
      }),
    );
  }

  deleteUser() {
    return from(AsyncStorage.removeItem(this.user_key));
  }
}

export const asyncStorageService = new AsyncStorageService();
