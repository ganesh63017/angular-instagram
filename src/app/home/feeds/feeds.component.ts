import { Component, OnInit } from '@angular/core';
import { HomeHttpService } from 'src/app/services/home-api/home-http.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css'],
})
export class FeedsComponent implements OnInit {
  userData: any;
  feedsData: any = [];
  commentsData: any = [];
  loading: boolean = false;
  likeLoading: boolean = false;
  savedPost: any;
  savedLoading: boolean = false;
  constructor(private http: HomeHttpService) {}

  // ngOnInit(): void {
  //   this.userData = JSON.parse(
  //     JSON.parse(JSON.stringify(localStorage.getItem('userData')))
  //   );
  //   this.getSavedPost();
  //   this.getComments();
  //   this.getFeeds(true);
  // }
  ngOnInit(): void {}
  getSavedPost() {
    this.savedLoading = true;
    this.http.getSavedPost(this.userData.token).subscribe({
      next: (res) => {
        this.savedPost = res.data;
        setTimeout(() => {
          this.getFeeds(false);
        }, 1000);
      },
    });
  }

  getFeeds(val: boolean) {
    if (val) {
      this.loading = true;
    }
    this.http.getFeeds('/feeds/posts', this.userData.token).subscribe({
      next: (response: any) => {
        this.feedsData = response;
        this.loading = false;
        this.likeLoading = false;
        this.savedLoading = false;
        this.getComments();
      },
      error: (error: any) => {
        this.loading = false;
        localStorage.clear();
        console.log(error);
      },
    });
  }

  getComments() {
    this.http.getComments('/feeds/comments', this.userData.token).subscribe({
      next: (response: any) => {
        this.commentsData = response.data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  likePost(id: any) {
    this.likeLoading = true;
    this.http.likeForPost(id, this.userData.token).subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.getFeeds(false);
        }, 1000);
        console.log(res);
      },
      error: (err: any) => {
        this.likeLoading = false;
        console.log(err);
      },
    });
  }
}
