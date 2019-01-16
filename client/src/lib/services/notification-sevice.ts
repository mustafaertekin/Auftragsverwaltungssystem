import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class NotificationService {
  options: any;
  constructor(
    private notificationService: NotificationsService) {
      this.options = {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      };
    }

  public success(text) {
    this.notificationService.success('Success', text, this.options);
  }

  public error(text) {
    this.notificationService.error('Error', text, this.options);
  }

  public info(text) {
    this.notificationService.info('Info', text, this.options);
  }

  public warn(text) {
    this.notificationService.warn('Warning', text, this.options);
  }
}
