import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';
import * as _ from 'lodash';
import { Device } from '@avs-ecosystem/models/Device';
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
export class DashboardOrderItemServiceComponent implements OnInit, OnChanges {

  @Input() service;
  @Input() orderId;
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
  isOnEditMode: boolean;
  addNewService: boolean;
  devices: any[];
  models: any[];
  services: any[];
  model: any;
  device: any;
  selectedService: any;
  public serviceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private deviceServices: DeviceService,
    private notificationService: NotificationService,
    private modelservice: ModelService,
    private orderItemService: OrderItemService,
    private deviceServiceTypeService: DeviceServiceType,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.isOnEditMode = false;
    this.addNewService = false;
    this.setForm();
    this.getDevices();
    if (this.service) {
      this.getModelsByDeviceId(this.service.device);
      this.getAllServicesByModelId(this.service.deviceModel);
    }
  }

  ngOnChanges() {
    if (this.service) {
      this.getModelsByDeviceId(this.service.device);
      this.getAllServicesByModelId(this.service.deviceModel);
    }
    this.setForm();
  }

  setForm() {
    console.log('orderId', this.orderId);
    if (this.service) {
      this.serviceForm = this.fb.group({
        device: [this.service.device.deviceId, [Validators.required]],
        model: [this.service.deviceModel.deviceModelId, [Validators.required]],
        service: [this.service.Service.serviceId, [Validators.required]],
        orderServiceId: [this.service.orderServiceId, []],
      });
    } else {
      this.serviceForm = this.fb.group({
        device: ['', [Validators.required]],
        model: ['', [Validators.required]],
        service: ['', [Validators.required]],
        orderId: [this.orderId, []],
      });
    }
  }

  getDevices() {
    this.deviceServices.getAll().subscribe(devices => {
      this.devices = devices;
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
    });
  }

  getModelsByDeviceId(device: Device) {
    this.device = device;
    this.modelservice.getAllByDeviceId(device.deviceId).subscribe(models => {
      this.models = models;
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
    });
  }

  getAllServicesByModelId(model: DeviceModel) {
    this.model = model;
    this.deviceServiceTypeService.getAllByModelId(model.deviceModelId)
      .subscribe(services => {
        this.services = services;
      }, (err) => {
        this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
      });
  }

  getSelectedService(service) {
    this.selectedService = service;
  }

  deleteOrderItemService() {
    this.orderItemService.deleteOrderService(this.service.orderServiceId).subscribe(() => {
      this.emitter.emit('deleted');
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
    });
  }

  updateService() {
    this.orderItemService.updateItem(this.serviceForm.value).subscribe(() => {
      this.notificationService.success('Service updated!');
      this.emitter.emit('updated');
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
    });
  }

  addService() {
    this.orderItemService.createOrderService(this.serviceForm.value).subscribe(() => {
      this.notificationService.success('Service saved!');
      this.emitter.emit('added');
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${_.get(err, 'error.message', '')}`);
    });
  }
}
