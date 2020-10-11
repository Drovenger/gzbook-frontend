import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private API_URL = environment.URL + 'post/';

  constructor(private http: HttpClient) {
  }

  creatNewPost(post) {
    return this.http.post(this.API_URL + 'create', post);
  }

  getAllPost() {
    return this.http.get(this.API_URL);
  }

  getPostById(id: number) {
    return this.http.get(this.API_URL + 'findById/' + id);
  }

  getAllPostByUserId(id: number) {
    return this.http.get(this.API_URL + 'findPostByPosterId/' + id);
  }

  deletePost(postId: number) {
    return this.http.delete(this.API_URL + 'delete/' + postId);
  }

  updatePost(postId: number, post) {
    return this.http.put(this.API_URL + 'update/' + postId, post);
  }

  searchPostByIdAndTextPost(id: number, textPost: string) {
    return this.http.get(this.API_URL + 'searchPost/' + id + '/' + textPost);
  }

  getAllImageByUserId(id: number) {
    return this.http.get(this.API_URL + 'findImageByPosterId/' + id);
  }
}
