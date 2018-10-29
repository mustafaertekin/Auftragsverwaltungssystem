import {DeviceModel} from "../models/entities/DeviceModel";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";
import { Device } from "../models/entities/Device";

export class DeviceModelManager {

    constructor() {
    }

    public async createDeviceModel(body: any ) {
        const device  = new Device({
            deviceName: body.deviceName
        });
        const savedDevice = await device.save();
        
        const newDeviceModel = new DeviceModel({
            deviceId: savedDevice.deviceId,
            deviceModelName: body.deviceModelName
        });
        return newDeviceModel.save();
    }

    public async updateDeviceModel(deviceModelId: string, deviceModelName: string): Promise<DeviceModel> {
        const deviceModel = await DeviceModel.find<DeviceModel>({where: {deviceModelId}});
        if(deviceModel) {
            
            deviceModel.deviceModelName = deviceModelName || deviceModel.deviceModelName;
            
            return deviceModel.save();
        } else {
            logger.error("No device model found");
            throw new NotFoundError("No deviceModel found with that id");
        }
    }

    public async findById(deviceModelId: string) {
        const deviceModel = await DeviceModel.findOne<DeviceModel>({where: {deviceModelId: deviceModelId}});
        if (deviceModel) {
            return deviceModel;
        } else {
            logger.error("No device model found with the provided id");
            throw new NotFoundError("No device model found with the provided id");
        }
    }

    public async findAll(): Promise<DeviceModel[]> {
        const deviceModels: DeviceModel[] = await DeviceModel.findAll<DeviceModel>({});
        if (deviceModels) {
            return deviceModels;
        } else {
            logger.error("No devices model found");
            throw new NotFoundError("No device model found with the provided email");
        }
    }

    public async deleteDeviceModel(deviceModelId: string): Promise<DeviceModel | null> {
        const deviceModel = await DeviceModel.find<DeviceModel>({where: {deviceModelId: deviceModelId}});
        if(deviceModel) {
            await deviceModel.destroy();
            return deviceModel;
        } else {
            logger.error("No device model found");
            throw new NotFoundError("No deviceModel found with that id");
        }
    }
}

/* {
    "deviceModelName": "XS Max 225",
    "deviceName": "Samsung"
  } */