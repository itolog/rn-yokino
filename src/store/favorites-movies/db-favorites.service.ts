import { from, Observable } from 'rxjs';
import { Favorites } from '../../shared/interface/favorites';

import DbService from '../../shared/services/db.service';

class DbFavoritesService {
  static createFavoriteDb() {
    return DbService.createDB(
      'favorites',
      'id integer not null, title text not null, poster text not null',
    );
  }

  static saveFavorites({ id, title, poster }: Favorites) {
    return from(
      DbService.save<Favorites>('favorites', { id, title, poster }),
    );
  }

  static removeFavorites(id: number): Observable<number> {
    return from(DbService.remove('favorites', id));
  }

  static getFavorites(): Observable<Favorites[]> {
    return from(DbService.getAll<Favorites>('favorites'));
  }
}

export default DbFavoritesService;
