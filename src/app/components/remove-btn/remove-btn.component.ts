import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-remove-btn',
  templateUrl: './remove-btn.component.html',
  styleUrls: ['./remove-btn.component.scss'],
})
export class RemoveBtnComponent {
  @Output() removePhoto = new EventEmitter<Event>();
  onRemovePhoto() {
    this.removePhoto.emit();
  }
}
