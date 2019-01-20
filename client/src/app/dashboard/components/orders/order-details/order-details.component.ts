import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '@avs-ecosystem/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { AppSettingsService } from '@avs-ecosystem/services/app-settings.service';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';
import { OrderItemService } from '@avs-ecosystem/services/order-item.service';
import * as moment from 'moment';

@Component({
  selector: 'avs-dashboard-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class DashboardOrderDetailsComponent implements OnInit, OnChanges {

  @Input() currentOrderId;
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();
  public currentOrder: any;
  disableDownloadButton: boolean;
  editorContent: string;
  currentUser: any;
  animationState: string;
  statuses: any[];
  deliveryDate: FormControl;
  deliveryDateForm: FormGroup;
  invoiceAddress: FormControl;
  deliveryAddress: FormControl;

  public orderStatus: string;

  constructor(
    private fb: FormBuilder,
    private settingService:  AppSettingsService,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private notificationService: NotificationService,
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.statuses = [
      { name: 'Opened', color: 'opened'},
      { name: 'In progress', color: 'inprogress'},
      { name: 'Ready', color: 'ready'},
      { name: 'Cancelled', color: 'cancelled'},
      { name: 'Closed', color: 'closed'}
    ];
    this.disableDownloadButton = false;
    this.settingService.getCurentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
    this.setAddressForm('');
  }

  setAddressForm(date) {
    if (!date) {
      date = new Date();
    }
    this.deliveryDate = new FormControl(new Date(date));
    this.deliveryAddress = new FormControl();
    this.invoiceAddress = new FormControl();
  }

  ngOnChanges (changes) {
    this.currentOrder = null;
    if (this.currentOrderId) {
      this.orderService.getById(this.currentOrderId).subscribe(order => {
        this.currentOrder = order;
        this.setAddressForm(_.get(this.currentOrder, 'deliveryDate', ''));
        this.editorContent = this.currentOrder.description;
        this.deliveryAddress = new FormControl(order.deliveryAddressId.addressId);
        this.invoiceAddress = new FormControl(order.billingAddressId.addressId);

        const contactAddresses = {
          orderId: order.orderId,
          deliveryAddressId: '',
          billingAddressId: ''
        };

        this.deliveryAddress.valueChanges.subscribe(addressId => {
          contactAddresses.deliveryAddressId = addressId;
          this.updateAssignableAddresses(contactAddresses);
        });

        this.invoiceAddress.valueChanges.subscribe(addressId => {
          contactAddresses.billingAddressId = addressId;
          this.updateAssignableAddresses(contactAddresses);
        });
      });
    }
  }

  updateAssignableAddresses(address) {
    this.orderService.changeContactaddress(address).subscribe(result => {
      this.notificationService.success('Address is successfuly updated!');
    });
  }

  saveNewDeliveryDate() {
    const data = {
      date: this.deliveryDate.value,
      orderId: this.currentOrderId
    };
    this.orderService.updateDeliveryDate(data).subscribe(result => {
      this.emitter.emit('update');
      this.notificationService.success('Delivery date is updated!');
    });
  }

  getAllOrderItemServicesByOrderId() {
    this.orderItemService.getByOrderId(this.currentOrderId).subscribe(items => {
      this.currentOrder.orderServices = items;
      this.currentOrder.price = items
          .reduce((acc, curr, index) => {
            acc += curr.Service.price;
            return acc; }, 0);
    });
  }

  getOrderById (event) {
    this.getAllOrderItemServicesByOrderId();
    this.emitter.emit(event);
  }

  deleteOrder(orderId) {
    this.orderService.deleteOrder(orderId).subscribe(result => {
      this.emitter.emit('update');
      this.notificationService.success('Order has been deleted!');
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
    });
  }

  downloadInvoice(orderId) {
    this.disableDownloadButton = true;
    this.orderService.download(orderId).subscribe(response => {
      this.disableDownloadButton = false;
      const blob = new Blob([response], { type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
      this.notificationService.success('Document is ready!');
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
    });
  }

  emailToClient(orderId) {
    this.orderService.mail(orderId).subscribe(response => {
      this.notificationService.success('Email is sent');
    }, (err) => { });
  }

  saveStatus(state) {
    const order = {
      status: state,
      orderId: this.currentOrderId
    };

    this.orderService.saveStatus(order).subscribe(response => {
      this.emitter.emit('update');
      this.notificationService.success('Status has been updated!');
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
    });
  }

  addOrderComment(comment) {
    const order = {
      description: comment,
      orderId: this.currentOrderId
    };
    this.orderService.comment(order).subscribe(response => {
      this.notificationService.success('Commend has been added!');
    }, (err) => {
      this.notificationService.error(`${_.get(err, 'statusText', 'Error')}, ${ _.get(err, 'error.message', '')}`);
    });
  }

  isAdmin() {
    if (this.currentUser && this.currentUser.role) {
      return this.currentUser.role === 'admin';
    }
    return false;
  }
}
