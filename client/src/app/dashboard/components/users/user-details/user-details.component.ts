import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { UserService } from '@avs-ecosystem/services/user.service';
import { AddressService } from '@avs-ecosystem/services/address.service';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';

@Component({
  selector: 'avs-dashboard-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class DashboardUserDetailsComponent implements OnInit, OnChanges {
  public userForm: FormGroup;
  public updatePasswordForm: FormGroup;
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();
  @Input() userId: any;
  public user: any;
  currentUser: any;


  constructor(private fb: FormBuilder, private addressService: AddressService,
    private userService: UserService,
    private notificationService: NotificationService,
    private settingService:  AppSettingsService) {
  }

  ngOnInit() {
    this.setUserForm();

    this.settingService.getCurentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  ngOnChanges() {
    if (this.userId) {
      this.userService.getById(this.userId).subscribe(user => {
        this.user = user;
        this.setFormFields(user);
      }, (err) => {
        this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
      });
    }
  }

  setUserForm() {
    this.userForm = this.fb.group({
      isActive: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.updatePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
    });
  }

  public submitUserForm() {
      this.updateClient();
  }

  private updateClient() {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userId, this.userForm.value)
        .subscribe(result => {
          const info = { id: result.userId, type: 'update'};
          this.emitter.emit(info);
          this.notificationService.success('User is updated');
        }, (err) => {
          this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
        });
    }
  }

  deleteUser() {
    this.userService.delete(this.userId)
    .subscribe(result => {
      const info = { id: result.userId, type: 'delete'};
      this.emitter.emit(info);
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
    });
  }

  setFormFields(result) {
    if (result) {
      this.userForm.controls['email'].setValue(result.email);
      this.userForm.controls['firstName'].setValue(result.firstName);
      this.userForm.controls['lastName'].setValue(result.lastName);
      this.userForm.controls['isActive'].setValue(result.isActive);
      this.userForm.controls['role'].setValue(result.role);
    }
  }

  updatePassword() {
    if (this.updatePasswordForm.valid) {
      this.userService.updatePassword(this.userId, this.updatePasswordForm.value)
        .subscribe(result => {
          this.emitter.emit(result.userId);
          this.notificationService.success('Password is updated');
        }, (err) => {
          this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
        });
    }
  }

  isAdmin() {
    if (this.currentUser && this.currentUser.role) {
      return this.currentUser.role === 'admin';
    }
    return false;
  }
}
