import {Component, OnInit} from '@angular/core';
import {UsersService} from '../service/friend/users.service';
import {NgForm} from '@angular/forms';
import {IUser} from '../model/IUser';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  users: IUser[];
  sumUsers: number = 0;

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {


    if (form.value.username === '') {
      this.userService.findAllUser().subscribe(
        response => {
          this.users = <IUser[]> response,
            this.sumUsers = this.users.length;
        },
        error => console.error(error)
      );
    } else {
      this.userService.findUserByUsername(form.value.username).subscribe(
        response => {
          this.users = <IUser[]> response,
            this.sumUsers = this.users.length;
        },
        error => console.error(error)
      );
    }
    form.reset(
      {
        username: ''
      }
    );
  }

}
