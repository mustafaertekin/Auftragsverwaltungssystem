import {Component, OnInit, OnChanges, Input, EventEmitter} from '@angular/core';
import { DeviceService } from '@avs-ecosystem/services/device.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
import { Device } from '@avs-ecosystem/models/Device';
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

  constructor( private deviceService: DeviceService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.setDeviceForm();
    this.getAllDevices();
  }

  public getAllDevices() {
    this.deviceService.getAll().subscribe(result => {
      this.devices = result;
    });
  }

  submitDeviceForm() {
    if (this.deviceForm.valid) {
      this.deviceService.create(this.deviceForm.value).subscribe(result => {
        this.getAllDevices();
      });
    }
  }


  setSelectedDevice(device) {
    this.device = device;
  }

  setDeviceForm() {
    // setTimeout(() => {
      this.deviceForm = this.fb.group({
        deviceName: ['', [Validators.required]]
      });

      this.selectedDeviceForm = this.fb.group({
        selectedDevice: ['', [Validators.required]]
      });
    // }, 0);
  }
}
