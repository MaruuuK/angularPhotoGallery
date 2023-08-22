import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorites/favorites.service';
import { Photo } from 'src/app/shared/photo.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  public favoritePhotos: Photo[] = [];

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.favoritePhotos = this.favoriteService.getFavorites();
  }
}
