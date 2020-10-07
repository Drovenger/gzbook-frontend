import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {Store, State} from '@ngrx/store';
import {Observable, from} from 'rxjs';
import * as userLogins from '../_action/userActions';
import {UserState, getLogin} from '../_reducers';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataUser: any = [];

  constructor(private _store: Store<UserState>,
              private router: Router) {
    this._store.select(getLogin).subscribe(item => {
      this.dataUser = item;
      // console.log(item);
    });
  }

  logout = () => {
    this._store.dispatch(new userLogins.LogoutLoginAction);
    this.router.navigateByUrl('/login');
  };

  ngOnInit(): void {
  }

}
