import { Component, OnInit, OnChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { UserService } from '@avs-ecosystem/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'avs-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnChanges {
  users: any;
  currentUserId: string;
  animationState: string;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  init() {
    this.currentUserId = null;
    this.animationState = 'out';
    this.route.params.subscribe(params => {
      this.currentUserId = params['id'] ? params['id'] : null;
      if (this.currentUserId === 'list') {
        this.currentUserId = null;
      }
    });
    this.getAll(null);
  }

  getAll(event) {
    this.animationState = 'out';
    this.userService.getAll().subscribe(users => {
     if (event) {
       if (event.type === 'delete') {
         this.currentUserId = null;
       }
       if (event.type === 'update') {
        this.currentUserId = event.id;
      }
     }
     this.setAfterUpdate(users);
    });
  }

  setAfterUpdate(users) {
    this.animationState = 'in';
    this.users = users;
    this.currentUserId = this.currentUserId || this.users.length ? this.users[0]['userId'] : null;
  }

  searchWord(word) {
    this.animationState = 'out';
    if (!word) {
      return this.getAll(null);
    }
    this.userService.getByText(word).subscribe(users => {
      this.setAfterUpdate(users);
    });
  }
}
