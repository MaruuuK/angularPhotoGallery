import { Component, OnInit } from '@angular/core';
import { GetPhotosService } from 'src/app/services/get-photos/get-photos.service';
import { Photo } from 'src/app/shared/photo.model';

@Component({
  selector: 'app-photos-main',
  templateUrl: './photos-main.component.html',
  styleUrls: ['./photos-main.component.scss'],
})
export class PhotosMainComponent implements OnInit {
  public photosList: Photo[] = [];
  public isLoading = false;

  constructor(private getPhotosService: GetPhotosService) {}

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.isLoading = true;
    for (let i = 0; i < 3; i++) {
      this.getPhotosService.getRandomImage(i).subscribe((photoUrl: string) => {
        this.photosList.push({ id: i, url: photoUrl });
        this.isLoading = false;
      });
    }
    console.log(this.photosList);
  }
}
