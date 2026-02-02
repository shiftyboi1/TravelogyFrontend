import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('travelogy.db');

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT NOT NULL,
      tag TEXT NOT NULL,
      type TEXT NOT NULL,
      language TEXT NOT NULL,
      version INTEGER NOT NULL,
      text TEXT NOT NULL
    );
  `);
}

export { db };
