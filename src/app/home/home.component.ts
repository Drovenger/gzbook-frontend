import {Component, OnInit} from '@angular/core';
import {IUser} from '../model/IUser';
import {UserService} from '../service/user.service';
import {IPost} from '../model/IPost';
import {PostService} from '../service/post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userLogin: IUser;
  allPost: IPost[];

  constructor(private postService: PostService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.getAllPost();
    this.userService.getUser().subscribe(
      res => {
        this.userLogin = res as IUser;
      }
    );
  }

  getAllPost() {
    this.postService.getAllPost().subscribe(
      postList => this.allPost = postList as IPost[]
    );
  }

  addNewPost(value) {
    this.getAllPost();
  }

  addNewComment(value) {
    this.getAllPost();
  }

  delPost(value) {
    this.allPost.splice(value, 1);
  }

  sharePost(value) {
    this.getAllPost();
  }

}
