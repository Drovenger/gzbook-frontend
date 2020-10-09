import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss']
})
export class ShortcutComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
              private header: HeaderComponent) {
  }

  ngOnInit(): void {
  }

  userId = this.tokenStorageService.getUser().id;

  logOut() {
    this.header.logout();
  }

}
