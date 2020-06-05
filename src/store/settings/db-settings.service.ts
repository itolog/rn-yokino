import { Transaction, SQLError } from 'react-native-sqlite-storage';
import { from, Observable } from 'rxjs';
import { Settings } from '../../shared/interface/settings';
import { THEMES } from '../../shared/constants/themes';

import { dbService } from '../../shared/services/db.service';
import openDb from '../../shared/services/open-db';

const db = openDb();

interface Payload {
  imagePath: string;
}

class DbSettingsService {
  // Create Setting DB and init default value if DB not exists
  async initSettingsDb() {
    try {
      const createDbRes = await this.createSettingsDb();
      console.log(createDbRes);
      const rows = await this.getSettings().toPromise();
      if (rows.length === 0) {
        return this.save(THEMES.DEFAULT_BG, THEMES.DEFAULT_THEME_COLOR);
      }
      return rows;
    } catch (e) {
      console.log(`Ошибка инициализации базы данныx settings`);
      throw e;
    }
  }

  createSettingsDb() {
    return dbService.createDB(
      'settings',
      'id integer primary key not null, imagePath text, theme text',
    );
  }

  save(imagePath: string, theme: string) {
    return dbService.save<Settings>('settings', { imagePath, theme });
  }

  // UPDATE IMAGE PATH
  updateImage(imagePath: string): Observable<Settings[] | any> {
    return from(
      dbService.updateOne<Settings, Payload>('settings', { imagePath }),
    );
  }

  remove(id: number) {
    return new Promise((resolve, reject) =>
      db.transaction((tx: Transaction) => {
        tx.executeSql(
          'DELETE FROM settings WHERE id = ?',
          [id],
          () => resolve(id),
          (_: Transaction, error: SQLError) => {
            reject(error);
            return false;
          },
        );
      }),
    );
  }

  getSettings(): Observable<Settings[]> {
    return from(dbService.getAll<Settings>('settings'));
  }
}

export const dbSettingsService = new DbSettingsService();
