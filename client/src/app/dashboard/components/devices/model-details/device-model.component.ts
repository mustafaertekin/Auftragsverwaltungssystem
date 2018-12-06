import {Component, OnInit, OnChanges, Input, EventEmitter} from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { DeviceModel } from '@avs-ecosystem/models/DeviceModel';
import { ModelService } from '@avs-ecosystem/services/device-model.service';
import { Device } from '@avs-ecosystem/models/Device';

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
  public model: DeviceModel;
  @Input() deviceId;
  public selectedDevice: Device;

  constructor( private modelService: ModelService, private fb: FormBuilder) {
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
      });
    }
  }

  submitModelForm() {
    if (this.modelForm.valid) {
      this.modelService.create(this.modelForm.value, this.deviceId).subscribe(result => {
        this.getAllModels();
      });
    }
  }


  setModelForm() {
    this.modelForm = this.fb.group({
      deviceModelName: ['', [Validators.required]]
    });
  }

  setSelectedDeviceModel(model: DeviceModel) {
    this.model = model;
  }
}
