import { Directory, File, Paths } from 'expo-file-system';

export enum DataKey {
  TAGS = 'tags'
}

export enum StorageLocation {
  DATA =  'data',
  DOCUMENTS = 'docs',
}

const rootDir = new Directory(Paths.document, 'travelogy_v2');

export class SaveFileSystem {

  private static getDirectory(location: StorageLocation): Directory {
    return new Directory(rootDir, location);
  }

  static async ensureDirExists(location?: StorageLocation) {
    if (!rootDir.exists) {
      await rootDir.create();
    }

    if (location) {
      const dir = this.getDirectory(location);
      if (!dir.exists) {
        await dir.create();
      }
    }
  }

  static async set<T>(location: StorageLocation, key: DataKey, data: T): Promise<void> {
    try {
      await this.ensureDirExists(location);
      const file = new File(this.getDirectory(location), `${key}.json`);
      if (!file.exists) await file.create();
      await file.write(JSON.stringify({ data }));
    } catch (error) {
      // ignore
    }
  }

  static async get<T>(location: StorageLocation, key: DataKey): Promise<T | null> {
    try {
      const file = new File(this.getDirectory(location), `${key}.json`);

      if (!file.exists) return null;

      return JSON.parse(await file.text()).data as T; 
    } catch (error) {
      // ignore
      return null;
    }
  }

  static async remove(location: StorageLocation, key: DataKey) {
    const file = new File(this.getDirectory(location), `${key}.json`);
    if (file.exists) {
      await file.delete();
    }
  }
}