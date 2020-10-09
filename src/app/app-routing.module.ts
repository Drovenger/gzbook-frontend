import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginAndRegisterComponent} from './login-and-register/login-and-register.component';
import {CommentComponent} from './comment/comment.component';
import {CommentListComponent} from './comment-list/comment-list.component';


const routes: Routes = [
  {
    path: '',
    component: LoginAndRegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'comment',
    component: CommentComponent
  },
  {
    path: 'comment',
    component: CommentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
