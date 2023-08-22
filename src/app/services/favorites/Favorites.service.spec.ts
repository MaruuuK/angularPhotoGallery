import { TestBed } from '@angular/core/testing';
import { Photo } from 'src/app/shared/photo.model';
import { FavoriteService } from './favorites.service';

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteService);
    service['photos'] = []; // Reset photos array before each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a photo to favorites', () => {
    const photo: Photo = { id: 1, url: 'Some URL', thumbnailUrl: 'Some thumb URL' };
    service.add(photo);

    expect(service.getFavorites()).toContain(photo);
  });

  it('should not add duplicate photo to favorites', () => {
    const photo: Photo = {
      id: 1,
      url: 'Some URL',
      thumbnailUrl: 'Some thumb URL',
    };
    service.add(photo);
    service.add(photo);

    expect(service.getFavorites().length).toBe(1);
  });

  it('should remove a photo from favorites', () => {
    const photo: Photo = {
      id: 1,
      url: 'Some URL',
      thumbnailUrl: 'Some thumb URL',
    };
    service.add(photo);
    service.remove(photo.id);

    expect(service.getFavorites()).not.toContain(photo);
  });

  it('should get a photo by ID', () => {
    const photo: Photo = {
      id: 1,
      url: 'Some URL',
      thumbnailUrl: 'Some thumb URL',
    };
    service.add(photo);
    const foundPhoto = service.getById(photo.id);

    expect(foundPhoto).toEqual(photo);
  });

  it('should return null when getting non-existent photo by ID', () => {
    const foundPhoto = service.getById(1);

    expect(foundPhoto).toBeNull();
  });

  it('should save favorites to localStorage', () => {
    const photo: Photo = {
      id: 1,
      url: 'Some URL',
      thumbnailUrl: 'Some thumb URL',
    };
    service.add(photo);

    const savedPhotos = JSON.parse(
      localStorage.getItem(service['storageKey']) || '[]'
    );
    expect(savedPhotos).toContain(photo);
  });
});
