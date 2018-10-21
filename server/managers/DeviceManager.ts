import {Device} from "../models/entities/Device";
import {NotFoundError} from "../errors/NotFoundError";

export class DeviceManager {

    constructor() {
    }

    public async createDevice(deviceId: string, deviceName: string ) {
        const newDevice = new Device({
            deviceId,
            deviceName
             });
        return newDevice.save();
    }

    public async updateDevice(deviceId: string, deviceName: string) {
        const device = await Device.find<Device>({where: {deviceId: deviceId}});
        if(device) {
            device.deviceId = deviceId;
            device.deviceName = deviceName;
            
            return device.save();
        } else {
            throw new NotFoundError("No device found with that id");
        }
    }

    public async deleteDevice(deviceId) {
        const device = await Device.find<Device>({where: {deviceId: deviceId}});
        if(device) {
            return device.destroy();
        } else {
            throw new NotFoundError("No device found with that id");
        }
    }
}