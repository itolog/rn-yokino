import { SQLError, Transaction } from 'react-native-sqlite-storage';
import openDb from './open-db';

const db = openDb();

class DbService {
  // CREATE DB
  static createDB(dbName: string, query: string): Promise<string> {
    return new Promise((resolve, reject) => {
      return db.transaction((tx: Transaction) => {
        return tx.executeSql(
          `create table if not exists ${dbName} (${query});)`,
          [],
          () => resolve(`база ${dbName} успешно создана`),
          (_: Transaction, error: SQLError) => {
            console.log(`db == ${dbName} == error`, error);
            return reject(error.message);
          },
        );
      });
    });
  }

  // DROP DB
  static dropDB(dbName: string) {
    return new Promise((resolve, reject) =>
      db.transaction((tx: Transaction) => {
        tx.executeSql(
          `drop table ${dbName}`,
          [],
          () => resolve(`База ${dbName} успешно удалена`),
          (_: Transaction, error: SQLError) => reject(error.message),
        );
      }),
    );
  }

  static save<T>(dbName: string, queryPayload: T): Promise<T[]> {
    const args = Object.values(queryPayload);
    const payload = Object.keys(queryPayload);
    const payloadQuery = Object.keys(queryPayload).join();
    const queryValues = '?, '.repeat(payload.length).slice(0, -2);

    return new Promise((resolve, reject) =>
      db.transaction((tx: Transaction) => {
        return tx.executeSql(
          `insert into ${dbName} (${payloadQuery}) values(${queryValues})`,
          args,
          (_: Transaction, { rows }) => {
            return resolve(rows.raw());
          },
          (_: Transaction, error: SQLError) => {
            return reject(error);
          },
        );
      }),
    );
  }

  static remove(dbName: string, id: string): Promise<string> {
    return new Promise((resolve, reject) =>
      db.transaction((tx: Transaction) => {
        return tx.executeSql(
          `DELETE FROM ${dbName} WHERE id = ?`,
          [id],
          () => resolve(id),
          (_: Transaction, error: SQLError) => {
            return reject(error);
          },
        );
      }),
    );
  }

  static updateOne<T, P>(dbName: string, queryPayload: P): Promise<T[]> {
    const payload = Object.values(queryPayload).join();
    const payloadQuery = Object.keys(queryPayload).join();

    return new Promise((resolve, reject) =>
      db.transaction(tx =>
        tx.executeSql(
          `update ${dbName} set ${payloadQuery} = ? where id = 1;`,
          [payload],
          (_: Transaction, { rows }) => resolve(rows.raw()),
          (_: Transaction, error: SQLError) => reject(error),
        ),
      ),
    );
  }

  static getAll<T>(dbName: string): Promise<T[]> {
    return new Promise((resolve, reject) =>
      db.transaction((tx: Transaction) => {
        tx.executeSql(
          `select * from ${dbName}`,
          [],
          (_, { rows }) => resolve(rows.raw()),
          (_: Transaction, error: SQLError) => reject(error),
        );
      }),
    );
  }
}

export default DbService;
