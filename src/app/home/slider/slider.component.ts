import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  constructor() {}
  images: any = [];

  @Input() photos: any;
  @Input() modal: any;
  @Input() upload: any;

  ngOnInit(): void {
    if (this.upload) {
      this.images = this.photos.map((each: any) => {
        return {
          path: each,
        };
      });
    } else {
      this.images = this.photos.map((each: any) => {
        return {
          path: `http://localhost:8080/${each}`,
        };
      });
    }
  }
}
