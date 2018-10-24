import {Device} from "../models/entities/Device";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";

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

    public async updateDevice(deviceId: string, deviceName: string): Promise<Device> {
        const device = await Device.find<Device>({where: {deviceId}});
        if(device) {
            device.deviceName = deviceName || device.deviceName;
            
            return device.save();
        } else {
            logger.error("No device found");
            throw new NotFoundError("No device found with that id");
        }
    }

    public async deleteDevice(deviceId: string): Promise<Device | null> {
        const device = await Device.find<Device>({where: {deviceId}});
        if(device) {
            await device.destroy();
            return device;
        } else {
            logger.error("No device found");
            throw new NotFoundError("No device found with that id");
        }
    }
}