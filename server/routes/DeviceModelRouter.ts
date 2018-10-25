import * as express from "express";
import {DeviceModel} from "../models/entities/DeviceModel";
import {Auth} from "../auth/auth";
import {DeviceModelManager} from "../managers/DeviceModelManager";

export class DeviceModelRouter {

    public router: express.Router;
    private deviceModelManager: DeviceModelManager;


    constructor() {
        this.deviceModelManager = new DeviceModelManager();
        this.router = express.Router();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const deviceModels = await DeviceModel.findAll<DeviceModel>();
            res.json(deviceModels);
        } catch(error) {
            next(error);
        }
    }
 
    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const deviceModel = await DeviceModel.findOne<DeviceModel>({ where: {deviceModelId: req.params.deviceModelId} });
            res.json(deviceModel);
        } catch(error) {
            next(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newDeviceModel = await this.deviceModelManager.createDeviceModel(
                req.body.deviceModelId,
                req.body.deviceModelName
            );
            res.json(newDeviceModel);
        } catch(error) {
            next(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const updatedDeviceModel = await this.deviceModelManager.updateDeviceModel(
                req.params.deviceModelId,
                req.body.deviceModelName
            );
            res.json(updatedDeviceModel);
        } catch(error) {
            next(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const deviceModel = this.deviceModelManager.deleteDeviceModel(req.params.deviceModelId);
            res.json(deviceModel);
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