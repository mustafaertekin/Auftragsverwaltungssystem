import {Component, OnInit, OnChanges, Input, EventEmitter} from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { DeviceModel } from '@avs-ecosystem/models/DeviceModel';
import { ModelService } from '@avs-ecosystem/services/device-model.service';
import { Device } from '@avs-ecosystem/models/Device';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';
import * as _ from 'lodash';

@Component({
  selector: 'avs-dashboard-device-model',
  templateUrl: './device-model.component.html',
  styleUrls: ['./device-model.component.scss']
})
export class DashboardDeviceModelComponent implements OnInit, OnChanges {
  models: any[];
  myModels = new FormControl();
  filteredOptions: Observable<DeviceModel[]>;
  public modelForm: FormGroup;
  public selectedDeviceModelForm: FormGroup;
  public model: DeviceModel;
  @Input() deviceId;
  public selectedDevice: Device;

  constructor( private modelService: ModelService, private notificationService: NotificationService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.setModelForm();
    this.getAllModels();
  }

  ngOnChanges() {
    this.getAllModels();
  }

  public getAllModels() {
    if (this.deviceId) {
      this.modelService.getAllByDeviceId(this.deviceId).subscribe(result => {
        this.models = result;
      }, (err) => {
        this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
      });
    }
  }

  submitModelForm() {
    if (this.modelForm.valid) {
      this.modelService.create(this.modelForm.value, this.deviceId).subscribe(result => {
        this.getAllModels();
      }, (err) => {
        this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
      });
    }
  }


  setModelForm() {
    this.modelForm = this.fb.group({
      deviceModelName: ['', [Validators.required]]
    });

    this.selectedDeviceModelForm = this.fb.group({
      selectedDeviceModel: ['', [Validators.required]]
    });
  }

  setSelectedDeviceModel(model: DeviceModel) {
    this.model = model;
  }
}
