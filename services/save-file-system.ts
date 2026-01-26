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

  static async ensureDirExists(location?: StorageLocation, shouldCreate?: boolean) {
    if (!rootDir.exists) {
      await rootDir.create();
    }
    if (location && shouldCreate) {
      const dir = this.getDirectory(location);
      if (!dir.exists) {
        await dir.create();
      }
    }
  }

  static async set<T>(location: StorageLocation, key: DataKey, data: T): Promise<void> {
    try {
      await this.ensureDirExists(location, true);
      const file = new File(this.getDirectory(location), `${key}.json`);
      await file.write(JSON.stringify({ data }));
    } catch (error) {
      console.error(`[SaveFile] Write failed for ${key}:`, error);
    }
  }

  static async get<T>(location: StorageLocation, key: DataKey): Promise<T | null> {
    try {
      const file = new File(this.getDirectory(location), `${key}.json`);

      if (!file.exists) return null;

      return JSON.parse(await file.text()).data as T; 
    } catch (error) {
       console.warn(`[FileSystemCache] Read failed for ${key}`, error);
      return null;
    }
  }

  static async remove(location: StorageLocation, key: DataKey) {
    const file = new File(this.getDirectory(location), `${key}.json`);
    if (file.exists) {
      await file.delete();
    }
  }

  // TODO: Fetch all content from file
  // TODO: Remove test warnings
}