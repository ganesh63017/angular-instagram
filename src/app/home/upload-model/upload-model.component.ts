import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-upload-model',
  templateUrl: './upload-model.component.html',
  styleUrls: ['./upload-model.component.css'],
})
export class UploadModelComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NavbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  previewPhotos: any = [];

  closeModal() {
    this.dialogRef.close();
  }

  selectPics(event: any) {
    if (event.target.files && event.target.files[0]) {
      var fileAmount = event.target.files.length;
      const imageS = event.target.files;
      console.log(imageS);
      // this.addPostForm.get('image')?.setValue(imageS);
      for (let i = 0; i < fileAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.previewPhotos.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}
