import { Transaction, SQLError } from 'react-native-sqlite-storage';
import { Settings } from '../../shared/interface/settings';
import { THEMES } from '../../shared/constants/themes';

import DbService from '../../shared/services/db.service';
import openDb from '../../shared/services/open-db';
import { from, Observable } from 'rxjs';

const db = openDb();

interface Payload {
  imagePath: string;
}

class DbSettingsService {
  // Create Setting DB and init default value if DB not exists
  static async initSettingsDb() {
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

  static createSettingsDb() {
    return DbService.createDB(
      'settings',
      'id integer primary key not null, imagePath text, theme text',
    );
  }

  static save(imagePath: string, theme: string) {
    return DbService.save<Settings>('settings', { imagePath, theme });
  }

  // UPDATE IMAGE PATH
  static updateImage(imagePath: string): Observable<Settings[] | any> {
    return from(
      DbService.updateOne<Settings, Payload>('settings', { imagePath }),
    );
  }

  static remove(id: number) {
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

  static getSettings(): Observable<Settings[]> {
    return from(DbService.getAll<Settings>('settings'));
    // return new Promise((resolve, reject) =>
    //   db.transaction((tx: Transaction) =>
    //     tx.executeSql(
    //       'select * from settings',
    //       [],
    //       (_, { rows }) => resolve(rows.raw()),
    //       (_: Transaction, error: SQLError) => {
    //         console.log('error get settings DB', error.message);
    //         return reject(error);
    //       },
    //     ),
    //   ),
    // );
  }
}

export default DbSettingsService;
