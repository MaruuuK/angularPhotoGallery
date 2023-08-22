import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.favoritePhotos = this.favoriteService.getFavorites();
  }

  onNavigateSinglePhoto(photo: Photo) {
    this.router.navigate(['/photos', photo.id]);
  }
}
