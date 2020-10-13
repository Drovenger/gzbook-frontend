import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {TokenStorageService} from '../service/token-storage.service';
import {CommentService} from '../service/comment.service';
import {IComment} from '../model/IComment';
import {NgForm} from '@angular/forms';
import {LikeCommentService} from '../service/like-comment.service';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent implements OnInit {

  constructor(private userService: UserService,
              private postService: PostService,
              private likeCommentService: LikeCommentService,
              private tokenStorage: TokenStorageService,
              private commentService: CommentService
  ) { }

  ngOnInit(): void {
  }

  @Input() comment: IComment

  editComment(form: NgForm) {
    this.comment.content = form.value.content;
    this.commentService.updateComment(this.comment.commentId, this.comment).subscribe();
    // @ts-ignore
    Swal.fire(
      'Done!',
      'Your comment has been saved!',
      'success'
    )
  }
}
