import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RemoveBtnComponent } from './remove-btn.component';

describe('RemoveBtnComponent', () => {
  let component: RemoveBtnComponent;
  let fixture: ComponentFixture<RemoveBtnComponent>;
  let emitSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveBtnComponent);
    component = fixture.componentInstance;
    emitSpy = spyOn(component.removePhoto, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit removePhoto event on button click', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
