import * as express from "express";
import {ClientRouter} from "./ClientRouter";
import {AuthRouter} from "./AuthRouter";
import {UserRouter} from "./UserRouter";
import {DeviceRouter} from "./DeviceRouter";
import { ForeignKey } from "sequelize-typescript";
import { OrderRouter } from "./OrderRouter";
import { AddressRouter } from "./AddressRouter";
import { DeviceModelRouter } from "./DeviceModelRouter";
import { ServiceRouter } from "./ServiceRouter";
import { SettingRouter } from "./SettingRouter";
import { CompanyRouter } from "./CompanyRouter";

export class Router {

    public static initializeRoutes(app: express.Express) {
        app.use('/oauth', new AuthRouter().router);
        app.use('/users', new UserRouter().router);
        app.use('/clients', new ClientRouter().router);
        app.use('/orders', new OrderRouter().router);
        app.use('/addresses', new AddressRouter().router);
        app.use('/devices', new DeviceRouter().router);
        app.use('/device-models', new DeviceModelRouter().router);
        app.use('/services', new ServiceRouter().router);
        app.use('/settings', new SettingRouter().router);
        app.use('/companies', new CompanyRouter().router);
    }
}
