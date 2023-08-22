import { Injectable } from '@angular/core';
import { Photo } from 'src/app/shared/photo.model';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'src/app/shared/config.service';

@Injectable({
  providedIn: 'root',
})
export class LoadPhotoService {
  // This is a part of fake API call.
  // Every run lastId will start from random value
  private lastId = Math.floor(Math.random() * 1000);

  constructor(private config: ConfigService) {}

  // This function imitates an API call with random delay.
  loadPhotos(amount: number): Observable<Photo[]> {
    const photos: Photo[] = [];

    for (let i = 0; i < amount; i++) {
      const id = this.lastId++;
      photos.push({
        id: id,
        url: this.getPhotoUrl(id, 400, 600),
        thumbnailUrl: this.getPhotoUrl(id, 300, 300),
      });
    }

    const randomDelay = Math.floor(Math.random() * 100) + 200;

    return of(photos)
      .pipe(delay(randomDelay))
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(errorRes: HttpErrorResponse) {
    const errorMessage = 'Something went wrong. Please, try later.';
    if (!errorRes.error?.error) {
      return throwError(() => errorMessage);
    }
    return throwError(() => errorMessage);
  }

  // This is a part of fake API call.
  private getPhotoUrl(id: number, width: number, height: number): string {
    return `${this.config.apiUrl}${id}/${width}/${height}`;
  }
}
