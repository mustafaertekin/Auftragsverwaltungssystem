import {Setting} from "../models/entities/Setting";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";

export class SettingManager {

    constructor() {
    }

    public async createSetting(settingId: string, userId: string, language: string ) {
        const newSetting = new Setting({
            settingId,
            userId,
            language
        });
        return newSetting.save();
    }

    public async updateSetting(settingId, userId, language): Promise<Setting> {
        const setting = await Setting.find<Setting>({where: {settingId: settingId}});
        if(setting) {
            setting.settingId = settingId;
            setting.userId = userId;
            setting.language = language;
            
            return setting.save();
        } else {
            logger.error("No setting model found");
            throw new NotFoundError("No setting found with that id");
        }
    }

    public async deleteSetting(settingId: string): Promise<Setting | null> {
        const setting = await Setting.find<Setting>({where: {settingId: settingId}});
        if(setting) {
            await setting.destroy();
            return setting;
        } else {
            logger.error("No setting model found");
            throw new NotFoundError("No setting found with that id");
        }
    }
}