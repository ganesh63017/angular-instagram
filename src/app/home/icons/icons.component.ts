import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentModelComponent } from '../comment-model/comment-model.component';
import { HomeHttpService } from '../../services/home-api/home-http.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css'],
})
export class IconsComponent implements OnInit {
  subject = new Subject();
  constructor(public dialog: MatDialog, private http: HomeHttpService) {}

  @Input() feedsData: any;
  @Input() commentsData: any;
  @Input() likeLoading: any;
  @Input() savedPost: any;
  @Input() savedLoading: any;

  @Output() likePost = new EventEmitter();
  @Output() getFeeds = new EventEmitter();
  @Output() getSavedPost = new EventEmitter();

  isLiked: boolean = false;
  commentsCount: number = 0;
  commentLoading: boolean = false;
  textCommentLoading: boolean = false;
  isSaved: boolean = false;
  message = '';
  showEmojiPicker = false;
  postCommentLoading = false;
  userData: any;

  ngOnInit(): void {
    let data = JSON.parse(
      JSON.parse(JSON.stringify(localStorage.getItem('userData')))
    );

    this.userData = data;

    this.feedsData.likes.map((each: any) => {
      if (JSON.stringify(each) === JSON.stringify(data.user._id)) {
        this.isLiked = true;
      } else {
        this.isLiked = false;
      }
    });

    const bookMark = this.savedPost.filter(
      (each: any) => each.savedPost._id === this.feedsData._id
    );
    this.isSaved = bookMark.length;

    this.getCommentCount();
  }

  liked(id: any) {
    this.likePost.emit(id);
  }

  getCommentCount() {
    const len = this.commentsData.filter((each: any) => {
      if (JSON.stringify(this.feedsData._id) === JSON.stringify(each.post_id)) {
        return each;
      }
    });
    this.commentsCount = len.length;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getCommentCount();
    }, 1000);
  }

  savePost(id: any) {
    let data = JSON.parse(
      JSON.parse(JSON.stringify(localStorage.getItem('userData')))
    );
    this.http.savePost(id, data.token).subscribe({
      next: (res) => {
        console.log(res);
        this.getSavedPost.emit();
      },
    });
  }

  deleteSavedPost(id: any) {
    let data = JSON.parse(
      JSON.parse(JSON.stringify(localStorage.getItem('userData')))
    );

    this.http.deleteSavePost(id, data.token).subscribe({
      next: (res) => {
        console.log(res);
        this.getSavedPost.emit();
      },
    });
  }

  getCommentModel(id: any, text: boolean) {
    if (text) {
      this.textCommentLoading = true;
    } else {
      this.commentLoading = true;
    }

    setTimeout(() => {
      this.commentLoading = false;
      this.textCommentLoading = false;
      this.openDialog(id);
    }, 1000);
  }

  openDialog(commentId: any): void {
    let dialogRef = this.dialog.open(CommentModelComponent, {
      width: '1300px',
      height: '90vh',
      data: {
        feedId: this.feedsData._id,
        commentId: commentId,
        getFeeds: this.getFeeds,
      },
    });

    dialogRef.beforeClosed().subscribe(() => {
      this.getFeeds.emit(false);
      this.getSavedPost.emit();
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
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

  postComment(id: any) {
    console.log(this.message);
    this.postCommentLoading = true;
    this.http
      .commentToFeed(this.userData.token, id, {
        comment: this.message,
      })
      .subscribe({
        next: () => {
          this.message = '';
          this.getFeeds.emit(false);
          this.openDialog(id);
        },
      });
  }
}
