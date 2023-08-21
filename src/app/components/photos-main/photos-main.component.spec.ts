import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosMainComponent } from './photos-main.component';

describe('PhotosMainComponent', () => {
  let component: PhotosMainComponent;
  let fixture: ComponentFixture<PhotosMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosMainComponent]
    });
    fixture = TestBed.createComponent(PhotosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
