import { Component } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'app-remove-btn',
  templateUrl: './remove-btn.component.html',
  styleUrls: ['./remove-btn.component.scss']
})
export class RemoveBtnComponent {
  constructor(private favoriteService: FavoriteService) { }
}
