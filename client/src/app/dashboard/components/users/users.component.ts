import { Component, OnInit, OnChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { UserService } from '@avs-ecosystem/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';
import * as _ from 'lodash';

@Component({
  selector: 'avs-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnChanges {
  users: any;
  currentUserId: string;
  animationState: string;
  isMobile: boolean;
  opened: boolean;

  constructor(private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  init() {
    this.currentUserId = null;
    this.opened = true;
    this.animationState = 'out';
    this.route.params.subscribe(params => {
      this.currentUserId = params['id'] ? params['id'] : null;
      if (this.currentUserId === 'list') {
        this.currentUserId = null;
      }
    });
    this.getAll(null);
  }

  changeNavigationState(event) {
    this.isMobile = event.isMobile;
    this.opened = event.opened;
  }

  closeOnMobileSelection(item, nav) {
    this.navigateToUrl(item);
    if (this.isMobile) {
      nav.sidenav.toggle();
    }
  }

  navigateToUrl(user) {
    this.currentUserId = user.userId;
    this.router.navigate(['/', 'dashboard', 'users', user.userId]);
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
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
    });
  }
}
