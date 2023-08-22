import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBtnComponent } from './remove-btn.component';

describe('RemoveBtnComponent', () => {
  let component: RemoveBtnComponent;
  let fixture: ComponentFixture<RemoveBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveBtnComponent]
    });
    fixture = TestBed.createComponent(RemoveBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
