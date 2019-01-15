import { Component, OnInit, Input } from '@angular/core';
import { DeviceModel } from '@avs-ecosystem/models/DeviceModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardNewDeviceComponent } from '../../device-details/new-devices.component';
import { ModelService } from '@avs-ecosystem/services/device-model.service';
import * as _ from 'lodash';
import { DashboardDeviceModelComponent } from '../device-model.component';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';

@Component({
  selector: 'avs-added-model',
  templateUrl: './added-model.component.html',
  styleUrls: ['./added-model.component.scss']
})
export class DashboardModelExstraComponent implements OnInit {

  currentUser: any;

  public modelForm: FormGroup;
  @Input() model: DeviceModel;
  constructor(
    private modelService: ModelService,
    private parent: DashboardDeviceModelComponent,
    private fb: FormBuilder,
    private settingService:  AppSettingsService) {
  }

  ngOnInit() {
    this.modelForm = this.fb.group({
      deviceModelName: [this.model.deviceModelName, [Validators.required]]
    });

    this.settingService.getCurentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  updateModel() {
    if (this.modelForm.valid && this.model.deviceModelId) {
      const model = this.modelForm.value;
      model.modelId = this.model.deviceModelId;
      this.modelService.update(model).subscribe(result => {
        this.parent.getAllModels();
      });
    }
  }

  deleteModel() {
    if (this.modelForm.valid && this.model.deviceModelId) {
      this.modelService.delete(this.model.deviceModelId).subscribe(() => {
        this.parent.getAllModels();
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
