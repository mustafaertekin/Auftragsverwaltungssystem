import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
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
import { OrderItemService } from '@avs-ecosystem/services/order-item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avs-order-item-service',
  templateUrl: './order-item-service.component.html',
  styleUrls: ['./order-item-service.component.scss']
})
export class DashboardOrderItemServiceComponent implements OnInit {

  @Input() service;
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
  isOnEditMode: boolean;
  devices: any [];
  models: any [];
  services: any [];
  model: any;
  device: any;
  selectedService: any;
  public serviceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private deviceServices: DeviceService,
    private modelservice: ModelService,
    private orderItemService: OrderItemService,
    private deviceServiceTypeService: DeviceServiceType,
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.isOnEditMode = false;
    this.serviceForm = this.fb.group({
      device: [this.service.device.deviceId, [Validators.required]],
      model: [this.service.deviceModel.deviceModelId, [Validators.required]],
      service: [ this.service.Service.serviceId, [Validators.required]],
      orderServiceId: [ this.service.orderServiceId, []],
    });

    this.getDevices();
    this.getModelsByDeviceId(this.service.device);
    this.getAllServicesByModelId(this.service.deviceModel);
  }


  getDevices () {
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

  getSelectedService(service) {
    this.selectedService = service;
  }

  deleteOrderItemService () {
    this.orderItemService.deleteOrderService(this.service.orderServiceId).subscribe(() => {
      this.emitter.emit('deleted');
    });
  }

  updateService() {
    this.orderItemService.updateItem(this.serviceForm.value).subscribe(() => {
      this.emitter.emit('updated');
    });
  }
}
