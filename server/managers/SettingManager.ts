import {Setting} from "../models/entities/Setting";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";

export class SettingManager {

    constructor() {
    }

    public async createSetting(body: any) {
      if(!body.settingId) {
        const newSetting = new Setting({body});
        return newSetting.save();
      } else {
        return await this.updateSetting(body.settingId, body.theme, body.language);
      }
    }

    public async updateSetting(settingId, theme, language): Promise<Setting> {
        const setting = await Setting.find<Setting>({where: {settingId: settingId}});
        if(setting) {
            setting.theme = theme;
            setting.language = language;

            return setting.save();
        } else {
            logger.error("No setting model found");
            throw new NotFoundError("No setting found with that id");
        }
    }

    public async findById(settingId: string) {
        const setting = await Setting.findOne<Setting>({where: {settingId: settingId}});
        if (setting) {
            return setting;
        } else {
            logger.error("No setting found with the provided id");
            throw new NotFoundError("No setting found with the provided id");
        }
    }

    public async findAll(): Promise<Setting[]> {
        const settings: Setting[] = await Setting.findAll<Setting>({});
        if (settings) {
            return settings;
        } else {
            logger.error("No setting found");
            throw new NotFoundError("No setting found");
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
