import {Setting} from "../models/entities/Setting";
import {NotFoundError} from "../errors/NotFoundError";

export class SettingManager {

    constructor() {
    }

    public async createSetting(settingId, userId, language ) {
        const newSetting = new Setting({
            settingId,
            userId,
            language
        });
        return newSetting.save();
    }

    public async updateSetting(settingId, userId, language) {
        const setting = await Setting.find<Setting>({where: {settingId: settingId}});
        if(setting) {
            setting.settingId = settingId;
            setting.userId = userId;
            setting.language = language;
            
            return setting.save();
        } else {
            throw new NotFoundError("No setting found with that id");
        }
    }

    public async deleteSetting(settingId) {
        const setting = await Setting.find<Setting>({where: {settingId: settingId}});
        if(setting) {
            return setting.destroy();
        } else {
            throw new NotFoundError("No setting found with that id");
        }
    }
}