import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/shared/config.service';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetPhotosService {
  constructor(private url: ConfigService) {}

  getRandomPhoto(id: number): Observable<string> {
    const randomDelay = Math.floor(Math.random() * 100) + 200;
    return of(`${this.url.apiUrl}${id}200/300?random=${Math.random()}`).pipe(
      delay(randomDelay)
    );
  }
}
