import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from '../model/IUser';
import {IPost} from '../model/IPost';
import {IComment} from '../model/IComment';
import {ILikePost} from '../model/ILikePost';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../service/token-storage.service';
import {PostService} from '../service/post.service';
import {UserService} from '../service/user.service';
import {LikePostService} from '../service/like-post.service';
import {CommentService} from '../service/comment.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  @Output() indexDelPost = new EventEmitter();
  @Output() sharePostEvent = new EventEmitter();
  @Input() post: IPost;
  @Input() index: number;
  postList: IPost[];
  editPost: IPost;
  editPostId: number;
  userLogin: IUser;
  sharedPost: IPost;
  likePost = {
    id: null,
    postId: null,
    likerId: null,
  };
  liked: boolean;
  likeList: ILikePost[];

  constructor(private userService: UserService,
              private postService: PostService,
              private commentService: CommentService,
              private likePostService: LikePostService,
              private tokenStorage: TokenStorageService,
              private actRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.showPost();
    this.checkLikedStatus();
    this.userService.getUser().subscribe(
      res => {
        this.userLogin = res as IUser;
      }
    );
  }

  showPost() {
    let id: number;
    if (this.actRoute.snapshot.params.id == null || !window.location.href.includes('status')) {
      id = this.post.postId;
    } else {
      id = parseInt(this.actRoute.snapshot.params.id);
    }
    this.postService.getPostById(id).subscribe(
      post => {
        this.post = post as IPost;
        this.userService.findUserById(this.post.posterId).subscribe(
          res => {
            let user = res as IUser;
            this.post.posterName = user.userName;
            this.post.posterAvatar = user.userAvatar;
            this.commentService.getCommentByPostId(this.post.postId).subscribe(
              commentList => {
                this.post.commentList = commentList as IComment[];
              }
            );
          }
        );
        if (this.post.linkPost !== '') {
          this.postService.getPostById(parseInt(this.post.linkPost)).subscribe(
            sharedPost => {
              this.sharedPost = sharedPost as IPost;
              this.userService.findUserById(this.sharedPost.posterId).subscribe(
                res => {
                  let user = res as IUser;
                  this.sharedPost.posterName = user.userName;
                  this.sharedPost.posterAvatar = user.userAvatar;
                }
              );
            }
          );
        }
      }
    );
  }

  likeAPost() {
    this.likePost.postId = this.post.postId;
    this.likePost.likerId = this.tokenStorage.getUser().id;
    this.likePostService.newLikePost(this.likePost).subscribe(
      res => {
        this.checkLikedStatus();
        this.post.postLike++;
      }
    );
  }

  unLikeAPost() {
    this.likePostService.findAllLikePost().subscribe(
      res => {
        this.likeList = res as ILikePost[];
        for (let i = 0; i < this.likeList.length; i++) {
          if (this.likeList[i].likerId === this.tokenStorage.getUser().id && this.likeList[i].postId === this.post.postId) {
            this.likePostService.unLikeAPost(this.likeList[i].id).subscribe();
            this.post.postLike--;
            this.liked = false;
          }
        }
      }
    );
  }

  checkLikedStatus() {
    this.liked = false;
    this.likePostService.findAllLikePost().subscribe(
      res => {
        this.likeList = res as ILikePost[];
        for (let i = 0; i < this.likeList.length; i++) {
          if (this.actRoute.snapshot.params.id == null || !window.location.href.includes('status')) {
            if (this.likeList[i].postId === this.post.postId) {
              if (this.likeList[i].likerId === this.tokenStorage.getUser().id) {
                this.liked = true;
              }
            }
          } else {
            if (this.likeList[i].postId === parseInt(this.actRoute.snapshot.params.id)) {
              if (this.likeList[i].likerId === this.tokenStorage.getUser().id) {
                this.liked = true;
              }
            }
          }
        }
      }
    );
  }

  deletePost(postId: any) {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete this post?',
      icon: 'warning',
      dangerMode: true,
    })
      .then(willDelete => {
          if (willDelete) {
            this.commentService.getCommentByPostId(postId).subscribe(
              commentList => {
                let comments = commentList as IComment[];
                for (let i = 0; i < comments.length; i++) {
                  this.commentService.deleteComment(comments[i].commentId).subscribe(
                    res => console.log('comment deleted')
                  );
                }
              }
            );
            this.postService.deletePost(postId).subscribe(
              res => {
                swal({
                  icon: 'success',
                  title: 'Your post has been deleted!'
                });
                this.indexDelPost.emit(this.index);
                if (this.actRoute.snapshot.params.id != null) {
                  this.router.navigate(['/home']);
                }
              }
            );
          }
        }
      );
  }

  addNewComment(value) {
    this.post.commentList.push(value);
  }

  delComment(value) {
    this.post.commentList.splice(value, 1);
  }

  sharePost(postId: number) {
    swal({
      title: 'Are you sure?',
      text: 'Do you want to share this post?',
      icon: 'info',
      dangerMode: false,
    })
      .then(share => {
          if (share) {
            this.postService.creatNewPost({
              posterId: this.tokenStorage.getUser().id,
              textPost: '',
              imagePost: '',
              videoPost: '',
              linkPost: postId,
              postDate: '',
              postLike: 0,
              postDislike: 0,
              status: 3
            }).subscribe(
              res => {
                this.sharePostEvent.emit(postId);
              }
            );
            swal({
              icon: 'success',
              title: 'This post has been shared!'
            });
          }
        }
      );
  }

}