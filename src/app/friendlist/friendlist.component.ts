import {Component, OnInit} from '@angular/core';
import {IUser} from '../model/IUser';
import {FriendService} from '../service/friend/friend.service';
import {UsersService} from '../service/friend/users.service';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.scss']
})
export class FriendlistComponent implements OnInit {

  friendList: IUser[];
  sumListFriend: number;
  sumListPending: number;
  pendingList: IUser[];
  user: IUser;
  userFriend: IUser;
  userPengding: IUser;
  userRelated: IUser;

  constructor(private userService: UsersService, private friendService: FriendService) {
  }

  ngOnInit(): void {
    this.getFriendList();
    this.getPendingList();
    this.getUser();

  }

  getFriendList() {
    this.userService.getUser().subscribe(
      response => {
        this.userFriend = response as IUser;
        console.log(this.userFriend.userId);
        this.friendService.getFriendList(this.userFriend.userId).subscribe(
          response => {
            this.friendList = response as IUser[],
              this.sumListFriend = this.friendList.length;
          },
          error => console.error(error)
        );
      },
      error => console.error(error)
    );

  }

  getPendingList() {
    this.userService.getUser().subscribe(
      response => {
        this.userPengding = response as IUser;
        this.friendService.getPengdingList(this.userPengding.userId).subscribe(
          response => {
            this.pendingList = response as IUser[],
              this.sumListPending = this.pendingList.length;
          },
          error => console.error(error)
        );
      },
      error => console.error(error)
    );
  }

  getUser() {
    this.userService.getUser().subscribe(
      response => {
        this.user = response as IUser;
        console.log(this.user);
      },
      error => console.error(error)
    );
  }

  unFriend(relatingId: number, statusId: number, index: number) {
    this.userService.findUserById(relatingId).subscribe(
      response => {
        this.user = response as IUser;
        this.userService.getUser().subscribe(
          response => {
            this.userRelated = response as IUser;
            this.friendService.unFriend(this.userRelated.userId, statusId, {
              'userId': this.user.userId,
              'userName': null,
              'userEmail': null,
              'userPassword': null,
              'userSex': null,
              'dateOfBirth': null,
              'about': null,
              'userAddress': null,
              'userAvatar': null,
              'userCoverPhoto': null,
              'roles': null
            }).subscribe(
              response => {
                if (statusId == 3) {
                  this.friendList.splice(index, 1);
                  this.sumListFriend = this.sumListFriend - 1;
                }
              },
              error => console.error(error)
            );
          },
          error => console.error(error)
        );
      },
      error => console.error(error)
    );
  }

  acceptInviteFriend(relatingId: number, statusId: number, index: number) {
    this.userService.findUserById(relatingId).subscribe(
      response => {
        this.user = <IUser> response;
        this.userService.getUser().subscribe(
          response => {
            this.userRelated = <IUser> response;
            this.friendService.acceptInviteFriend(this.userRelated.userId, statusId, {
              'userId': this.user.userId,
              'userName': null,
              'userEmail': null,
              'userPassword': null,
              'userSex': null,
              'dateOfBirth': null,
              'about': null,
              'userAddress': null,
              'userAvatar': null,
              'userCoverPhoto': null,
              'roles': null
            }).subscribe(
              response => {
                if (statusId == 3) {
                  this.pendingList.splice(index, 1);
                  this.sumListPending = this.sumListPending - 1;
                } else if (statusId == 2) {
                  this.pendingList.splice(index, 1);
                  this.friendList.push(this.user);
                  this.sumListPending = this.sumListPending - 1;
                  this.sumListFriend = this.sumListFriend + 1;
                }
              },
              error => console.error(error)
            );
          },
          error => console.error(error)
        );
      },
      error => console.error(error)
    );
  }

}
