import { Component, HostListener, OnInit } from '@angular/core';
import { LoadPhotoService } from 'src/app/services/load-photo/load-photo.service';
import { Photo } from 'src/app/shared/photo.model';

@Component({
  selector: 'app-photos-main',
  templateUrl: './photos-main.component.html',
  styleUrls: ['./photos-main.component.scss'],
})
export class PhotosMainComponent implements OnInit {
  public photosList: Photo[] = [];
  public isLoading = false;
  public error: string | null = null;

  constructor(private loadPhotoService: LoadPhotoService) {}

  ngOnInit() {
    this.loadPhotos(9);
  }

  private loadPhotos(amount: number): void {
    this.isLoading = true;

    this.loadPhotoService.loadPhotos(amount).subscribe({
      next: (results: Photo[]) => {
        this.photosList = this.photosList.concat(results);
        this.isLoading = false;
      },
      error: (errorMessage: string) => {
        this.error = errorMessage;
        this.isLoading = false;
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

    if (windowBottom >= docHeight - 1 && !this.isLoading) {
      this.loadPhotos(3);
    }
  }
}
