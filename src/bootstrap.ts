import DbFavoritesService from './store/favorites-movies/db-favorites.service';
import DbSettingsService from './store/settings/db-settings.service';
// import db from './shared/services/db.service';

export default async function bootstrap() {
  try {
    // await db.dropDB('favorites');
    await DbSettingsService.initSettingsDb();
    await DbFavoritesService.createFavoriteDb();
  } catch (e) {
    console.log(e);
  }
}
