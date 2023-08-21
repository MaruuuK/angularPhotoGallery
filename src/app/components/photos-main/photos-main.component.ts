import { Component, OnInit } from '@angular/core';
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
    this.loadPhotos(6);
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
}
