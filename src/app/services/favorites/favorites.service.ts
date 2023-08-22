import { Injectable } from '@angular/core';
import { Photo } from 'src/app/shared/photo.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoritePhoto: Photo[] = [];
  private favoritesKey = 'favorites';

  constructor() {
    const photos = localStorage.getItem(this.favoritesKey);
    if (photos) {
      this.favoritePhoto = JSON.parse(photos);
    }
  }

  getFavorites(): Photo[] {
    return this.favoritePhoto;
  }

  addFavorite(photo: Photo): void {
    const foundPhoto = this.favoritePhoto.find((item) => item.id === photo.id);
    if (!foundPhoto) {
      this.favoritePhoto.push(photo);
      localStorage.setItem(
        this.favoritesKey,
        JSON.stringify(this.favoritePhoto)
      );
    }
  }

  getPhotoById(id: number): string {
    const foundPhoto = this.favoritePhoto.find((item: Photo) => id === item.id);
    if (foundPhoto) {
      return foundPhoto.url;
    }
    return 'Photo not found';
  }
  
}
