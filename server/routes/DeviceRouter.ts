import * as express from "express";
import {Device} from "../models/entities/Device";
import {Auth} from "../auth/auth";
import {DeviceManager} from "../managers/DeviceManager";
import { BaseRouter } from "./BaseRouter";

export class DeviceRouter extends BaseRouter {

    public router: express.Router;
    private deviceManager: DeviceManager;


    constructor() {
        super();
        this.deviceManager = new DeviceManager();
        this.router = express.Router();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const devices = await Device.findAll<Device>();
            res.json(devices);
        } catch(error) {
            next(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const device = await Device.findOne<Device>({ where: {deviceId: req.params.deviceId} });
            res.json(device);
        } catch(error) {
            next(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newDevice = await this.deviceManager.createDevice(
                req.body.deviceName
            );
            res.json(newDevice);
        } catch(error) {
            next(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const updatedDevice = await this.deviceManager.updateDevice(
                req.params.id,
                req.body.deviceName
            );
            res.json(updatedDevice);
        } catch(error) {
            next(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const device = this.deviceManager.deleteDevice(req.params.id);
            res.json(device);
        } catch(error) {
            next(error);
        }
    }

    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(),this.get.bind(this));
        this.router.get("/:id", Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.post("/", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.put("/:id", Auth.getBearerMiddleware(), this.put.bind(this));
        this.router.delete("/:id", Auth.getBearerMiddleware(), this.delete.bind(this));
    }

}