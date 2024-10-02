// indexeddb.service.ts
import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbPromise!: Promise<IDBPDatabase>;

  constructor() {
    this.initDB();
  }

  // Initialize the database
  private initDB() {
    this.dbPromise = openDB('AudioDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('audios')) {
          db.createObjectStore('audios', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
      },
    });
  }

  // Save audio data
  async saveAudioData(data: {
    title: string;
    description: string;
    transcript: string;
    file: any;
  }) {
    const db = await this.dbPromise;
    const tx = db.transaction('audios', 'readwrite');
    await tx.objectStore('audios').add(data);
    await tx.done;
    console.log('Audio data saved to IndexedDB');
  }

  // Get all audio data
  async getAudioData() {
    const db = await this.dbPromise;
    const tx = db.transaction('audios', 'readonly');
    const audioData = await tx.objectStore('audios').getAll();
    await tx.done;
    return audioData;
  }
  async getAudioDataById(id: number) {
    console.log('Param', id);

    const db = await this.dbPromise;
    const tx = db.transaction('audios', 'readonly');
    const audioData = await tx.objectStore('audios').get(id);
    await tx.done;
    return audioData;
  }
}
