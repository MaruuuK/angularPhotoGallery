import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public readonly initialNumberPhotos = 9;
  public readonly loadMoreNumberPhotos = 3;

  public readonly apiUrl = 'https://picsum.photos/seed/';
}
