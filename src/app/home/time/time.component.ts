import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
})
export class TimeComponent implements OnInit {
  @Input() time: any;
  @Input() size: any;

  date: any;

  constructor() {}

  ngOnInit(): void {
    this.date = this.getTime(this.time);
  }

  getTime(_data: any) {
    const seconds = Math.floor(
      (new Date().valueOf() - new Date(_data).valueOf()) / 1000
    );

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + ' years ago';
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + `${interval === 1 ? ' month ago' : ' months ago'}`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + `${interval === 1 ? ' day ago' : " day's ago"}`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + ' hours ago';
    }

    interval = Math.floor(seconds / 60);
    console.log(interval);
    if (interval >= 1) {
      return interval + `${interval === 1 ? ' min ago' : ' minutes ago'}`;
    }

    return Math.floor(seconds) + ' seconds ago';
  }
}
