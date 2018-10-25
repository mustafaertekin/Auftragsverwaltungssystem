import * as express from "express";
import {Setting} from "../models/entities/Setting";
import {Auth} from "../auth/auth";
import {SettingManager} from "../managers/SettingManager";

export class SettingRouter {

    public router: express.Router;
    private settingManager: SettingManager;


    constructor() {
        this.settingManager = new SettingManager();
        this.router = express.Router();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const settings = await Setting.findAll<Setting>();
            res.json(settings);
        } catch(error) {
            next(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const setting = await Setting.findOne<Setting>({ where: {settingId: req.params.settingId} });
            res.json(setting);
        } catch(error) {
            next(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newSetting = await this.settingManager.createSetting(
                req.body.settingId,
                req.body.userId,
                req.body.language
            );
            res.json(newSetting);
        } catch(error) {
            next(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const updatedSetting = await this.settingManager.updateSetting(
                req.params.settingId,
                req.body.userId,
                req.body.language
            );
            res.json(updatedSetting);
        } catch(error) {
            next(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const setting = this.settingManager.deleteSetting(req.params.settingId);
            res.json(setting);
        } catch(error) {
            next(error);
        }
    }

    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.get("/:id", Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.post("/", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.put("/:id", Auth.getBearerMiddleware(), this.put.bind(this));
        this.router.delete("/:id", Auth.getBearerMiddleware(), this.delete.bind(this));
    }

}