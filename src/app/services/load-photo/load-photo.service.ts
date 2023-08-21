import { Injectable } from '@angular/core';
import { Photo } from 'src/app/shared/photo.model';
import { GetPhotosService } from 'src/app/services/get-photos/get-random-photo.service';
import { Observable, catchError, forkJoin, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoadPhotoService {
  private lastId = 0;
  constructor(private getPhotosService: GetPhotosService) {}

  loadPhotos(amount: number): Observable<Photo[]> {
    const observables: Observable<Photo>[] = [];

    for (let i = 0; i < amount; i++) {
      const id = this.lastId++;
      observables.push(
        this.getPhotosService
          .getRandomPhoto(id)
          .pipe(map((photoUrl: string) => ({ id: id, url: photoUrl })))
      );
    }

    return forkJoin(observables).pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(errorRes: HttpErrorResponse) {
    const errorMessage = 'Something went wrong. Please, try later.'
    if (!errorRes.error?.error) {
      return throwError(() => errorMessage);
    }
    return throwError(() => errorMessage);
  }
}
