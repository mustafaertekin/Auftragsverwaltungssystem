import {Component, OnInit, OnChanges, Input, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Service } from '@avs-ecosystem/models/Service';
import { DeviceService } from '@avs-ecosystem/services/device.service';
import { DeviceServiceType } from '@avs-ecosystem/services/device-service-type.service';

@Component({
  selector: 'avs-dashboard-device-service',
  templateUrl: './device-service.component.html',
  styleUrls: ['./device-service.component.scss']
})
export class DashboardDeviceServiceComponent implements OnInit, OnChanges {


  services: any[];
  myServices = new FormControl();
  filteredOptions: Observable<DeviceService[]>;
  public serviceForm: FormGroup;
  service: any;
  @Input() modelId;
  public selectedService: Service;

  constructor( private deviceService: DeviceServiceType, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.setServiceForm();
    this.getAllServices();

  }

  ngOnChanges() {
    this.getAllServices();
  }

  public getAllServices() {
    if (this.modelId) {
      this.deviceService.getAllByModelId(this.modelId).subscribe(result => {
        this.services = result;
      });
    }
  }

  submitServiceForm() {
    if (this.serviceForm.valid && this.modelId) {
      this.deviceService.create(this.serviceForm.value, this.modelId).subscribe(result => {
        this.getAllServices();
      });
    }
  }

  setServiceForm() {
    this.serviceForm = this.fb.group({
      serviceName: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }
}
