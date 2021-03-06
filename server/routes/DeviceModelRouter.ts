import * as express from "express";
import {DeviceModel} from "../models/entities/DeviceModel";
import {Auth} from "../auth/auth";
import {DeviceModelManager} from "../managers/DeviceModelManager";
import {Roles} from "../auth/roles";

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
            const deviceModel = await DeviceModel.findOne<DeviceModel>({ where: {deviceModelId: req.params.id} });
            res.json(deviceModel);
        } catch(error) {
            next(error);
        }
    }

    public async getAllByDeviceId(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const deviceModel = await DeviceModel.findAll<DeviceModel>({ where: {deviceId: req.params.deviceId} });
            res.json(deviceModel);
        } catch(error) {
            next(error);
        }
    }

    

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newDeviceModel = await this.deviceModelManager.createDeviceModel(req.body, req.params.deviceId);
            res.json(newDeviceModel);
        } catch(error) {
            next(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const updatedDeviceModel = await this.deviceModelManager.updateDeviceModel(
                req.params.id,
                req.body.deviceModelName
            );
            res.json(updatedDeviceModel);
        } catch(error) {
            next(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const deviceModel = this.deviceModelManager.deleteDeviceModel(req.params.id);
            res.json(deviceModel);
        } catch(error) {
            next(error);
        }
    }
    
    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), Roles.connectRoles.can('everyone'), this.get.bind(this));
        this.router.get("/getAllByDeviceId/:deviceId", Auth.getBearerMiddleware(), Roles.connectRoles.can('everyone'), this.getAllByDeviceId.bind(this));
        this.router.get("/:id", Auth.getBearerMiddleware(), Roles.connectRoles.can('everyone'), this.getById.bind(this));
        this.router.post("/:deviceId", Auth.getBearerMiddleware(), Roles.connectRoles.can('everyone'), this.post.bind(this));
        this.router.put("/:id", Auth.getBearerMiddleware(), Roles.connectRoles.can('everyone'), this.put.bind(this));
        this.router.delete("/:id", Auth.getBearerMiddleware(), Roles.connectRoles.can('admin'), this.delete.bind(this));
    }

}