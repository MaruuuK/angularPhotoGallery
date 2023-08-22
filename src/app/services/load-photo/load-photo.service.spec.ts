import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoadPhotoService } from './load-photo.service';
import { Photo } from 'src/app/shared/photo.model';
import { ConfigService } from 'src/app/shared/config.service';

describe('LoadPhotoService', () => {
  let service: LoadPhotoService;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadPhotoService, ConfigService],
    });

    service = TestBed.inject(LoadPhotoService);
    configService = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load photos', fakeAsync(() => {
    const amount = 5;
    const expectedPhotos: Photo[] = [];

    let photos: Photo[] = [];
    service.loadPhotos(amount).subscribe((result) => {
      photos = result;
    });

    tick(300); // Simulate the random delay

    const randomIdDiff = photos[0].id;
    for (let i = 0; i < amount; i++) {
      expectedPhotos.push({
        id: i + randomIdDiff,
        url: `${configService.apiUrl}${i + randomIdDiff}/400/600`,
        thumbnailUrl: `${configService.apiUrl}${i + randomIdDiff}/300/300`,
      });
    }

    expect(photos).toEqual(expectedPhotos);
  }));
});
