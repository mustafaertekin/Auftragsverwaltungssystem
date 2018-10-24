import {DeviceModel} from "../models/entities/DeviceModel";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";

export class DeviceModelManager {

    constructor() {
    }

    public async createDeviceModel(deviceModelId: string, deviceModelName: string ) {
        const newDeviceModel = new DeviceModel({
            deviceModelId,
            deviceModelName
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