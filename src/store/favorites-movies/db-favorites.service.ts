import { from, Observable } from 'rxjs';
import { Favorites } from '../../shared/interface/favorites';

import { dbService } from '../../shared/services/db.service';

class DbFavoritesService {
  createFavoriteDb() {
    return dbService.createDB(
      'favorites',
      'id integer not null, title text not null, poster text not null',
    );
  }

  saveFavorites({ id, title, poster }: Favorites) {
    return from(
      dbService.save<Favorites>('favorites', { id, title, poster }),
    );
  }

  removeFavorites(id: number): Observable<number> {
    return from(dbService.remove('favorites', id));
  }

  getFavorites(): Observable<Favorites[]> {
    return from(dbService.getAll<Favorites>('favorites'));
  }
}

export const dbFavoritesService = new DbFavoritesService();
