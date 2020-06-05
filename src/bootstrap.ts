import { dbFavoritesService } from './store/favorites-movies/db-favorites.service';
import { dbSettingsService } from './store/settings/db-settings.service';
// import db from './shared/services/db.service';

export default async function bootstrap() {
  try {
    // await db.dropDB('favorites');
    await dbSettingsService.initSettingsDb();
    await dbFavoritesService.createFavoriteDb();
  } catch (e) {
    console.log(e);
  }
}
