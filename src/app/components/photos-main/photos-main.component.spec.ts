import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { PhotosMainComponent } from './photos-main.component';
import { LoadPhotoService } from 'src/app/services/load-photo/load-photo.service';
import { FavoriteService } from 'src/app/services/favorites/favorites.service';
import { ConfigService } from 'src/app/shared/config.service';
import { Photo } from 'src/app/shared/photo.model';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';

  @Component({ selector: 'app-photo-card', template: '' })
  class MockAppFavoritesComponent {
    @Input() src!: string;
  }

describe('PhotosMainComponent', () => {
  let component: PhotosMainComponent;
  let fixture: ComponentFixture<PhotosMainComponent>;
  let mockLoadPhotoService: jasmine.SpyObj<LoadPhotoService>;
  let mockFavoriteService: jasmine.SpyObj<FavoriteService>;
  let mockConfigService: jasmine.SpyObj<ConfigService>;

  const mockPhotos: Photo[] = [
    { id: 1, url: 'photo1.jpg', thumbnailUrl: 'thumb1.jpg' },
    { id: 2, url: 'photo2.jpg', thumbnailUrl: 'thumb2.jpg' },
  ];

  beforeEach(() => {
    mockLoadPhotoService = jasmine.createSpyObj('LoadPhotoService', [
      'loadPhotos',
    ]);
    mockFavoriteService = jasmine.createSpyObj('FavoriteService', ['add']);
    mockConfigService = jasmine.createSpyObj('ConfigService', [], {
      initialNumberPhotos: 5,
      loadMoreNumberPhotos: 10,
    });

    TestBed.configureTestingModule({
      declarations: [PhotosMainComponent, MockAppFavoritesComponent],
      providers: [
        { provide: LoadPhotoService, useValue: mockLoadPhotoService },
        { provide: FavoriteService, useValue: mockFavoriteService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosMainComponent);
    component = fixture.componentInstance;

    mockLoadPhotoService.loadPhotos.and.returnValue(of(mockPhotos));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize photosList on ngOnInit', () => {
    fixture.detectChanges();
    expect(component.photosList).toEqual(mockPhotos);
  });

  it('should add photo to favorites on onAddFavorite', () => {
    const photo: Photo = {
      id: 1,
      url: 'photo1.jpg',
      thumbnailUrl: 'thumb1.jpg',
    };
    component.onAddFavorite(photo);
    expect(mockFavoriteService.add).toHaveBeenCalledWith(photo);
  });
});
