import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadModelComponent } from '../upload-model/upload-model.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userData: any = {};

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    let data = localStorage.getItem('userData');
    this.userData = JSON.parse(JSON.parse(JSON.stringify(data)));
    this.openDialog();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(UploadModelComponent, {
      minWidth: '700px',
      minHeight: '65vh',
      data: {},
    });

    dialogRef.beforeClosed().subscribe(() => {});

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
