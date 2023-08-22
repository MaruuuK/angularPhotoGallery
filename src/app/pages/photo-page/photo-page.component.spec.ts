import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PhotoPageComponent } from './photo-page.component';
import { FavoriteService } from 'src/app/services/favorites/favorites.service';
import { Photo } from 'src/app/shared/photo.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({ selector: 'app-photo-card', template: '' })
class MockAppPhotoCardComponent {
  @Input() src!: string;
}

@Component({ selector: 'app-remove-btn', template: '' })
class MockAppRemoveBtnComponent {
  @Output() removePhoto = new EventEmitter<void>();
}

describe('PhotoPageComponent', () => {
  let component: PhotoPageComponent;
  let fixture: ComponentFixture<PhotoPageComponent>;
  let mockFavoriteService: jasmine.SpyObj<FavoriteService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockPhoto: Photo = {
    id: 1,
    url: 'https://example.com/photo.jpg',
    thumbnailUrl: 'https://example.com/thumbnail.jpg',
  };

  beforeEach(() => {
    mockFavoriteService = jasmine.createSpyObj('FavoriteService', [
      'getById',
      'remove',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [
        PhotoPageComponent,
        MockAppPhotoCardComponent,
        MockAppRemoveBtnComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
        { provide: FavoriteService, useValue: mockFavoriteService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize src when photo exists', () => {
    mockFavoriteService.getById.and.returnValue(mockPhoto);
    fixture.detectChanges();

    expect(mockFavoriteService.getById).toHaveBeenCalledWith(1);
    expect(component.src).toBe(mockPhoto.url);
  });

  it('should not initialize src when photo does not exist', () => {
    mockFavoriteService.getById.and.returnValue(null);
    fixture.detectChanges();

    expect(mockFavoriteService.getById).toHaveBeenCalledWith(1);
    expect(component.src).toBeUndefined();
  });

  it('should remove photo and navigate on onRemovePhoto', () => {
    component['id'] = 1;
    component.onRemovePhoto();

    expect(mockFavoriteService.remove).toHaveBeenCalledWith(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/favorites']);
  });
});
