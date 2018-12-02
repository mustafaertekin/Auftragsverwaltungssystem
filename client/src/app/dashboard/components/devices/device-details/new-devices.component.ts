import {Component, OnInit, OnChanges, Input, EventEmitter} from '@angular/core';
import { DeviceService } from '@avs-ecosystem/services/device.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms'; 
import {Observable, BehaviorSubject} from 'rxjs';
import { Device } from '@avs-ecosystem/models/Device';
import * as _ from 'lodash';

@Component({
  selector: 'avs-dashboard-new-device',
  templateUrl: './new-devices.component.html',
  styleUrls: ['./new-devices.component.scss']
})
export class DashboardNewDeviceComponent implements OnInit {
  devices: any[];
  myDevices = new FormControl();
  filteredOptions: Observable<Device[]>;
  public deviceForm: FormGroup;
  public device: Device;

  constructor( private deviceService: DeviceService, private fb: FormBuilder) { 
    
  }

  ngOnInit() {
    this.setDeviceForm();
    this.getAllDevices()
      /*
      this.options = result; 
      this.filteredOptions = this.myDevices.valueChanges
        .pipe(
          startWith<string | Device>(''),
            map(value => typeof value === 'string' ? value : value.deviceName),
            map(name => {
              if(!name) {
                 this.showDeviceDetails(null);
              }
              return name ? this._filter(name) : this.options.slice();
            }) 
        ); 
        */
  
  } 

  public getAllDevices() {
    this.deviceService.getAll().subscribe(result => { 
      this.devices = result;
    });
  }

  /*
  displayFn(device?: string): string | undefined {
    return device ? device : undefined;
  }

  private _filter(word: string): Device[] { 
    const devices = this.options.filter(client => {
      let value = [client.deviceName.toLowerCase()]
      return _.includes(value.join("").toLowerCase(),  word.toLowerCase())
    });
    
    if(!devices.length){ 
      this.showDeviceDetails(null);
    }
    return devices;
  }
  */

  submitDeviceForm(){
    if(this.deviceForm.valid) { 
      this.deviceService.create(this.deviceForm.value).subscribe(result => {
        this.getAllDevices();
      })
    } 
  }

  /*
  showDeviceDetails(device){
    this.device = device; 
     let holder = null;
     if(!this.device){
      holder = { deviceName: ''};
     } 
     this.setFormFields(this.device || holder);
  }
  

  updateDevice(){
    if(this.deviceForm.valid && this.device.deviceId) { 
      const device = this.deviceForm.value;
      device.deviceId = this.device.deviceId;
      this.deviceService.update(device).subscribe(result => {
        this.getAllDevices().subscribe(devices => {
          this.options = devices;
          this.device = result;
        })
      })
    } 
  }
 */

setSelectedDevice(device){
  this.device = device;
}

  setDeviceForm(){
    this.deviceForm = this.fb.group({ 
      deviceName: ["", [Validators.required]]
    });
  }
  /*
  setFormFields(result) {
    this.deviceForm.controls['deviceName'].setValue(result.deviceName);
  } 
  */
}
