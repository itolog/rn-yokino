import { from, Observable } from 'rxjs';
import { Favorites } from '../../shared/interface/favorites';

import DbService from '../../shared/services/db.service';

class DbFavoritesService {
  static createFavoriteDb() {
    return DbService.createDB(
      'favorites',
      'id integer primary key not null, title text not null, id_movie text not null',
    );
  }

  static saveFavorites({ title, id_movie }: Favorites) {
    return from(
      DbService.save<Favorites>('favorites', { title, id_movie }),
    );
  }

  static removeFavorites(id_movie: string): Observable<string> {
    return from(DbService.remove('favorites', id_movie));
  }

  static getFavorites(): Observable<Favorites[]> {
    return from(DbService.getAll<Favorites>('favorites'));
  }
}

export default DbFavoritesService;
