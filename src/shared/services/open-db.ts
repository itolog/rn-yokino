import SQLite from 'react-native-sqlite-storage';
import config from '../config';

const openDb = () => {
  return SQLite.openDatabase(
    { name: config.DB_NAME, location: 'default' },
    () => {
      console.log('DB open');
    },
    e => {
      console.log(e.message);
    },
  );
};

export default openDb;
