import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeHttpService } from 'src/app/services/home-api/home-http.service';

@Component({
  selector: 'app-comment-model',
  templateUrl: './comment-model.component.html',
  styleUrls: ['./comment-model.component.css'],
})
export class CommentModelComponent {
  constructor(
    public dialogRef: MatDialogRef<CommentModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HomeHttpService
  ) {}

  feedData: any;
  commentsData: any;
  openReplies: any = [];
  likeLoading: boolean = false;
  isLiked: boolean = false;
  userData: any;
  savedLoading: boolean = false;
  isSaved: boolean = false;
  commentLikeLoading: any;
  name = 'Angular';
  message = '';
  showEmojiPicker = false;
  postCommentLoading = false;
  replyCommentId: any = '';
  @ViewChild('comment') Ref?: ElementRef;

  ngOnInit(): void {
    console.log(this.data);
    this.userData = JSON.parse(
      JSON.parse(JSON.stringify(localStorage.getItem('userData')))
    );

    this.getFeeds(this.data.feedId);
    this.getComments(this.data.commentId);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getComments(id: any) {
    this.http.getComment(id, this.userData.token).subscribe({
      next: (res) => {
        setTimeout(() => {
          console.log(res.data);
          this.commentsData = res.data;
          this.commentLikeLoading = '';
          this.postCommentLoading = false;
        }, 1000);
      },
    });
  }

  getFeeds(id: any) {
    this.http.getFeeds('/feeds/posts', this.userData.token).subscribe({
      next: (response: any) => {
        const feedData = response.filter((each: any) => {
          if (id === each._id) {
            return each;
          }
        });
        console.log(feedData);

        this.http.getSavedPost(this.userData.token).subscribe({
          next: (res) => {
            const bookMark = res.data.filter(
              (each: any) => each.post_id === this.data.feedId
            );
            this.isSaved = bookMark.length;
          },
        });

        setTimeout(() => {
          this.feedData = feedData[0];
          this.isLiked = feedData[0].likes.includes(this.userData.user._id);
          this.likeLoading = false;
          this.savedLoading = false;
        }, 800);
      },
      error: (error: any) => {
        localStorage.clear();
        console.log(error);
      },
    });
  }

  getIsLikedForMainComment(data: any) {
    if (data.likes.includes(this.userData.user._id)) {
      return false;
    } else {
      return true;
    }
  }

  likeFeed(id: any) {
    this.likeLoading = true;
    this.http.likeForPost(id, this.userData.token).subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.getFeeds(this.data.feedId);
        }, 1000);
      },
      error: (err: any) => {
        this.likeLoading = false;
        console.log(err);
      },
    });
  }

  savePost(id: any) {
    this.savedLoading = true;
    let data = JSON.parse(
      JSON.parse(JSON.stringify(localStorage.getItem('userData')))
    );
    this.http.savePost(id, data.token).subscribe({
      next: (res) => {
        console.log(res);
        setTimeout(() => {
          this.getFeeds(this.data.feedId);
        }, 1000);
      },
    });
  }

  deleteSavedPost(id: any) {
    this.savedLoading = true;
    let data = JSON.parse(
      JSON.parse(JSON.stringify(localStorage.getItem('userData')))
    );

    this.http.deleteSavePost(id, data.token).subscribe({
      next: (res) => {
        console.log(res);
        setTimeout(() => {
          this.getFeeds(this.data.feedId);
        }, 1000);
      },
    });
  }

  likeToComment(id: any) {
    console.log(id);
    this.commentLikeLoading = id;
    this.http.likeToComment(id, this.userData.token).subscribe({
      next: (res) => {
        console.log(res);
        this.getComments(this.data.feedId);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  openRepliedComments(id: any) {
    if (this.openReplies.includes(id)) {
      this.openReplies = this.openReplies.filter((each: any) => each !== id);
    } else {
      this.openReplies.push(id);
    }
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    const { message } = this;
    const text = `${message}${event.emoji.native}`;
    this.message = text;
    this.showEmojiPicker = false;
  }

  commentText(msg: any) {
    this.message = msg;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }

  postCommentForMain() {
    this.postCommentLoading = true;
    this.http
      .commentToFeed(this.userData.token, this.data.feedId, {
        comment: this.message,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getComments(this.data.feedId);
          this.message = '';
        },
      });
  }

  postReplyComment() {
    this.postCommentLoading = true;
    this.http
      .replyToComment(
        this.userData.token,
        this.data.feedId,
        this.replyCommentId,
        {
          comment: this.message,
        }
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getComments(this.data.feedId);
          this.replyCommentId = '';
          this.message = '';
          this.postCommentLoading = false;
        },
      });
  }
  postComment() {
    if (this.replyCommentId === '') {
      this.postCommentForMain();
    } else {
      this.postReplyComment();
    }
  }

  replyToComment(id: any) {
    console.log(id);
    this.replyCommentId = id;
    setTimeout(() => {
      this.Ref?.nativeElement.focus();
    });
  }
}
