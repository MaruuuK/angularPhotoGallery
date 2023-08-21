import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public readonly apiUrl = 'https://picsum.photos/seed/';
}
