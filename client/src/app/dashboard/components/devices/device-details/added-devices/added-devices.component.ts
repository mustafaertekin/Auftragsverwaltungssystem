import {Component, OnInit, OnChanges, Input, EventEmitter} from '@angular/core';
import { DeviceService } from '@avs-ecosystem/services/device.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
import { Device } from '@avs-ecosystem/models/Device';
import * as _ from 'lodash';
import { DashboardNewDeviceComponent } from '../new-devices.component';

@Component({
  selector: 'avs-dashboard-added-devices',
  templateUrl: './added-devices.component.html',
  styleUrls: ['./added-devices.component.scss']
})
export class DashboardAddedDeviceComponent implements OnInit {
  public deviceForm: FormGroup;
  @Input() device: Device;
  constructor( private deviceService: DeviceService,
    private parent: DashboardNewDeviceComponent,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.deviceForm = this.fb.group({
      deviceName: [this.device.deviceName, [Validators.required]]
    });
  }

  updateDevice(){
    if(this.deviceForm.valid && this.device.deviceId) {
      const device = this.deviceForm.value;
      device.deviceId = this.device.deviceId;
      this.deviceService.update(device).subscribe(result => {
        this.parent.getAllDevices();
      })
    }
  }

  deleteDevice(){
    if(this.deviceForm.valid && this.device.deviceId) {
      this.deviceService.delete(this.device.deviceId).subscribe(() => {
        this.parent.getAllDevices();
      })
    }
  }
}
