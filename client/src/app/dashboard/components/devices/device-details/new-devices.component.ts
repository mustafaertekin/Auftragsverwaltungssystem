import { Component, OnInit } from '@angular/core';
import { DeviceService } from '@avs-ecosystem/services/device.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device } from '@avs-ecosystem/models/Device';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';
import * as _ from 'lodash';

@Component({
  selector: 'avs-dashboard-new-device',
  templateUrl: './new-devices.component.html',
  styleUrls: ['./new-devices.component.scss']
})
export class DashboardNewDeviceComponent implements OnInit {
  devices: any[];
  public selectedDeviceForm: FormGroup;
  public deviceForm: FormGroup;
  public device: Device;
  currentUser: any;

  constructor(
    private settingService: AppSettingsService,
    private notificationService: NotificationService,
    private deviceService: DeviceService, private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.setDeviceForm();
    this.getAllDevices();
    this.settingService.getCurentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  public getAllDevices() {
    this.deviceService.getAll().subscribe(result => {
      this.devices = result;
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
    });
  }

  submitDeviceForm() {
    if (this.deviceForm.valid) {
      this.deviceService.create(this.deviceForm.value).subscribe(result => {
        this.getAllDevices();
      }, (err) => {
        this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
      });
    }
  }


  setSelectedDevice(device) {
    this.device = device;
  }

  setDeviceForm() {
    this.deviceForm = this.fb.group({
      deviceName: ['', [Validators.required]]
    });

    this.selectedDeviceForm = this.fb.group({
      selectedDevice: ['', [Validators.required]]
    });
  }

  isAdmin() {
    if (this.currentUser && this.currentUser.role) {
      return this.currentUser.role === 'admin';
    }
    return false;
  }
}
