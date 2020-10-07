import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Store, State} from '@ngrx/store';
import {Observable, from} from 'rxjs';
import {User} from '../_models/user';
import * as userLogins from '../_action/userActions';
import {UserState, getLogin} from '../_reducers';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Box Login';

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  isCheckLogin: boolean = false;

  dataLogin = [
    {
      id: 1,
      name: 'Trần Công Minh',
      email: 'minh@gmail.com',
      password: '123456',
      remember_token: 'TYDAKSDJASLKDJASLKDJASDASD'
    }
  ];

  constructor(private _store: Store<UserState>,
              private router: Router) {
  }

  onSubmit() {
    //console.warn(this.profile.value['email']);
    this.dataLogin.filter(item => {
      if (item.email === this.profileForm.value['email'] && item.password === this.profileForm.value['password']) {
        this.isCheckLogin = true;
        this._store.dispatch(new userLogins.CheckLoginAction({
          id: item.id,
          name: item.name,
          email: item.email,
          password: item.password,
          remember_token: item.remember_token
        }));
      }
    });
    if (this.isCheckLogin) {
      console.log('Success login!');
      this.router.navigateByUrl('/home');
    } else {
      console.log('Fail login!');
    }
  }

  ngOnInit(): void {
  }

}
