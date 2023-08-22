import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FavoritesComponent } from './favorites.component';
import { FavoriteService } from 'src/app/services/favorites/favorites.service';
import { Photo } from 'src/app/shared/photo.model';
import { Component, Input } from '@angular/core';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let mockFavoriteService: jasmine.SpyObj<FavoriteService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockPhotos: Photo[] = [
    { id: 1, url: 'photo1.jpg', thumbnailUrl: 'thumb1.jpg' },
    { id: 2, url: 'photo2.jpg', thumbnailUrl: 'thumb2.jpg' },
  ];

  @Component({ selector: 'app-photo-card', template: '' })
  class MockAppFavoritesComponent {
    @Input() src!: string;
  }

  beforeEach(() => {
    mockFavoriteService = jasmine.createSpyObj('FavoriteService', [
      'getFavorites',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [FavoritesComponent, MockAppFavoritesComponent],
      providers: [
        { provide: FavoriteService, useValue: mockFavoriteService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;

    mockFavoriteService.getFavorites.and.returnValue(mockPhotos);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize favoritePhotos from favoriteService', () => {
    fixture.detectChanges();

    expect(component.favoritePhotos).toEqual(mockPhotos);
  });

  it('should navigate to single photo page on onNavigateSinglePhoto', () => {
    const photo: Photo = {
      id: 1,
      url: 'photo1.jpg',
      thumbnailUrl: 'thumb1.jpg',
    };
    component.onNavigateSinglePhoto(photo);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/photos', photo.id]);
  });
});
