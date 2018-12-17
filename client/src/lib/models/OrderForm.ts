import {Device} from './Device';
import {Service} from './Service';
import {DeviceModel} from './DeviceModel';

export interface OrderForm {
  id: number;
  service: Service;
  model: DeviceModel;
  device: Device;
}
