import {Device} from "../models/entities/Device";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";

export class DeviceManager {

    constructor() {
    }

    public async createDevice(deviceName: string ) {
        const newDevice = new Device({
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

    public async findById(deviceId: string): Promise<Device> {
        const device = await Device.findOne<Device>({where: {deviceId}});
        if (device) {
            return device;
        } else {
            logger.error("No device found with the provided id");
            throw new NotFoundError("No device found with the provided id");
        }
    }

    public async findAll(): Promise<Device[]> {
        const devices: Device[] = await Device.findAll<Device>({});
        if (devices) {
            return devices;
        } else {
            logger.error("No devices found");
            throw new NotFoundError("No device found with the provided email");
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
