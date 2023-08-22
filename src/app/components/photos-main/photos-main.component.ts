import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { FavoriteService } from 'src/app/services/favorites/favorites.service';
import { LoadPhotoService } from 'src/app/services/load-photo/load-photo.service';
import { Photo } from 'src/app/shared/photo.model';

@Component({
  selector: 'app-photos-main',
  templateUrl: './photos-main.component.html',
  styleUrls: ['./photos-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PhotosMainComponent implements OnInit {
  public photosList: Photo[] = [];
  public isLoading = false;
  public error: string | null = null;

  constructor(
    private loadPhotoService: LoadPhotoService,
    private cdr: ChangeDetectorRef,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.loadPhotos(9);
  }

  private loadPhotos(amount: number): void {
    this.isLoading = true;

    this.loadPhotoService.loadPhotos(amount).subscribe({
      next: (results: Photo[]) => {
        this.photosList = this.photosList.concat(results);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (errorMessage: string) => {
        this.error = errorMessage;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const windowHeight = window.innerHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.scrollY;

    if (windowBottom >= docHeight - 50 && !this.isLoading) {
      this.loadPhotos(3);
    }
  }

  onAddFavorite(photo: Photo): void {
    this.favoriteService.addFavorite(photo);
  }
}
