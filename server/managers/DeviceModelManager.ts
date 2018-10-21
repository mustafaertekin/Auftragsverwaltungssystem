import {DeviceModel} from "../models/entities/DeviceModel";
import {NotFoundError} from "../errors/NotFoundError";

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

    public async updateDeviceModel(deviceModelId: string, deviceModelName: string) {
        const deviceModel = await DeviceModel.find<DeviceModel>({where: {deviceModelId: deviceModelId}});
        if(deviceModel) {
            deviceModel.deviceModelId = deviceModelId;
            deviceModel.deviceModelName = deviceModelName;
            
            return deviceModel.save();
        } else {
            throw new NotFoundError("No deviceModel found with that id");
        }
    }

    public async deleteDeviceModel(deviceModelId) {
        const deviceModel = await DeviceModel.find<DeviceModel>({where: {deviceModelId: deviceModelId}});
        if(deviceModel) {
            return deviceModel.destroy();
        } else {
            throw new NotFoundError("No deviceModel found with that id");
        }
    }
}