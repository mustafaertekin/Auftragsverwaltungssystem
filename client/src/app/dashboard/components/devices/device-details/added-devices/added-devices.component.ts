import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '@avs-ecosystem/services/device.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from '@avs-ecosystem/models/Device';
import * as _ from 'lodash';
import { DashboardNewDeviceComponent } from '../new-devices.component';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';

@Component({
  selector: 'avs-dashboard-added-devices',
  templateUrl: './added-devices.component.html',
  styleUrls: ['./added-devices.component.scss']
})
export class DashboardAddedDeviceComponent implements OnInit {
  public deviceForm: FormGroup;
  currentUser: any;

  @Input() device: Device;
  constructor(
    private settingService: AppSettingsService,
    private deviceService: DeviceService,
    private notificationService: NotificationService,
    private parent: DashboardNewDeviceComponent,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.deviceForm = this.fb.group({
      deviceName: [this.device.deviceName, [Validators.required]]
    });

    this.settingService.getCurentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
    });
  }

  updateDevice() {
    if (this.deviceForm.valid && this.device.deviceId) {
      const device = this.deviceForm.value;
      device.deviceId = this.device.deviceId;
      this.deviceService.update(device).subscribe(result => {
        this.parent.getAllDevices();
      }, (err) => {
        this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
      });
    }
  }

  deleteDevice() {
    if (this.deviceForm.valid && this.device.deviceId) {
      this.deviceService.delete(this.device.deviceId).subscribe(() => {
        this.parent.getAllDevices();
      }, (err) => {
        this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
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
