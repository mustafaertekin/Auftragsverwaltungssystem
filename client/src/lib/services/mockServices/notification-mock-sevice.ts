import { Injectable } from '@angular/core';

@Injectable()
export class NotificationMockService {
  options: any;
  constructor() {}

  public success(text) {
    // nothing to do
  }

  public error(text) {
     // nothing to do
  }

  public info(text) {
     // nothing to do
  }

  public warn(text) {
     // nothing to do
  }
}
