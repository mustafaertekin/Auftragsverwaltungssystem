import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
import * as _ from 'lodash';
import { Device } from '@avs-ecosystem/models/Device';
import { OrderForm } from '@avs-ecosystem/models/OrderForm';
import { Service } from '@avs-ecosystem/models/Service';
import { DeviceModel } from '@avs-ecosystem/models/DeviceModel';
import { DeviceService } from '@avs-ecosystem/services/device.service';
import { ModelService } from '@avs-ecosystem/services/device-model.service';
import { DeviceServiceType } from '@avs-ecosystem/services/device-service-type.service';


@Component({
  selector: 'avs-dashboard-order-services',
  templateUrl: './order-services.component.html',
  styleUrls: ['./order-services.component.scss']
})
export class DashboardOrderServicesComponent implements OnInit {
  device: Device;
  model: DeviceModel;
  service: Service;
  devices: Device[];
  models: DeviceModel[];
  services: Service[];
  public orders: OrderForm[];

  public serviceForm: FormGroup = this.fb.group({
    service: ['', [Validators.required]],
    model: ['', [Validators.required]],
    device: ['', [Validators.required]]
  });
  serviceTotal: number;

  constructor(private fb: FormBuilder,
    private deviceServices: DeviceService,
    private modelservice: ModelService,
    private deviceServiceTypeService: DeviceServiceType) {}

  ngOnInit() {
    this.getAllDevices();
    this.orders = [];
  }

  public removeServiceRow(id) {
    this.orders = this.orders.filter(item => item.id !== id);
    this.serviceTotal = this.orders.reduce((acc, curr, index) => { acc += curr.service.price; return acc; }, 0);
  }

  getAllDevices() {
    this.deviceServices.getAll().subscribe(devices => {
      this.devices = devices;
    });
  }

  getModelsByDeviceId(device: Device) {
    this.device = device;
    this.modelservice.getAllByDeviceId(device.deviceId).subscribe(models => {
      this.models = models;
    });
  }

  getAllServicesByModelId(model: DeviceModel) {
    this.model = model;
    this.deviceServiceTypeService.getAllByModelId(model.deviceModelId).subscribe(services => {
      this.services = services;
    });
  }

  getSelectedService(service: Service) {
    this.service = service;
  }


  public saveNewService() {
    if (this.serviceForm.valid) {
      const form: OrderForm = { id: 0, service: null, device: null, model: null};
      form.id = new Date().getTime();
      form.service = this.service;
      form.model = this.model;
      form.device = this.device;
      this.orders.push(form);

      this.serviceTotal = this.orders.reduce((acc, curr, index) => { acc += curr.service.price; return acc; }, 0);
    }
  }

  goToNextStep() {
    console.log('');
  }
}
