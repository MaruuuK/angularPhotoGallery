import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'app-photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoPageComponent implements OnInit {
  private id!: number;
  public src!: string;

  constructor(
    private route: ActivatedRoute,
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = Number(params['id']);
      this.src = this.favoriteService.getPhotoById(this.id);
    });
  }

  onRemovePhoto() {
    this.favoriteService.removePhoto(this.id);
    this.router.navigate(['/favorites']);
  }
}
