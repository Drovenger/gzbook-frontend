import {Component, Input, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../service/comment.service';
import {IPost} from '../model/IPost';
import {UserService} from '../service/user.service';
import {PostService} from '../service/post.service';
import {finalize} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import swal from 'sweetalert';


@Component({
  selector: 'app-status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.scss']
})
export class StatusEditComponent implements OnInit {

  @Input() post: IPost;

  constructor(private userService: UserService,
              private postService: PostService,
              private commentService: CommentService,
              private actRoute: ActivatedRoute,
              private storage: AngularFireStorage,
              private router: Router) {
  }

  ngOnInit(): void {

  }


  onSubmit(form: NgForm) {
    this.post.textPost = form.value.textPost;
    this.post.imagePost = form.value.imagePost;
    this.postService.updatePost(this.post).subscribe(res => {
      swal({
        icon: 'success',
        title: 'Nội dung đã được thay đổi!'
      });
    });
    // this.router.navigateByUrl('/');
  }

  deleteImage() {
    this.post.imagePost = '';
  }

  uploadFile(event) {
    let file = event.target.files[0];
    let filePath = file.name;
    let fileRef = this.storage.ref(filePath);
    let task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(
        url => this.post.imagePost = url))
    )
      .subscribe();
  }

  selectStatus(event) {
    this.post.status = event;
    console.log(this.post.status);
  }
}
