import { Injectable } from '@angular/core';
import { Photo } from 'src/app/shared/photo.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private photos: Photo[] = [];
  private storageKey = 'favorites';

  constructor() {
    const photos = localStorage.getItem(this.storageKey);
    if (photos) {
      this.photos = JSON.parse(photos);
    }
  }

  getFavorites(): Photo[] {
    return this.photos;
  }

  add(photo: Photo): void {
    if (this.getById(photo.id) === null) {
      this.photos.push(photo);
      this.saveToStorage();
    }
  }

  getById(id: number): Photo | null {
    const foundPhoto = this.photos.find((item: Photo) => id === item.id);
    return foundPhoto ? foundPhoto : null;
  }

  remove(id: number) {
    const foundPhoto = this.getById(id);
    if (foundPhoto) {
      this.photos.splice(this.photos.indexOf(foundPhoto), 1);
      this.saveToStorage();
    }
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.photos));
  }
}
