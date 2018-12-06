import {Component, OnInit, OnChanges, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'avs-dashboard-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DashboardDevicesComponent implements OnInit {
   public selectedDeviceId: string;

  constructor( ) {

  }

  ngOnInit() {

  }

  setSlectedDeviceId(deviceId) {
    this.selectedDeviceId = deviceId;
  }
}
