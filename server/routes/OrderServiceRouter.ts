import * as express from "express";
import {OrderService} from "../models/entities/OrderService";
import {Auth} from "../auth/auth";
import {OrderServiceManager} from "../managers/OrderServiceManager";
import {OrderManager} from "../managers/OrderManager";
import { Service } from "../models/entities/Service";
import { Device } from "../models/entities/Device";
import { DeviceModel } from "../models/entities/DeviceModel";

export class OrderServiceRouter {

    public router: express.Router;
    private orderServiceManager: OrderServiceManager;
    private orderMangager: OrderManager;

    constructor() {
        this.orderServiceManager = new OrderServiceManager();
        this.orderMangager = new OrderManager();
        this.router = express.Router();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const orderServices = await OrderService.findAll<OrderService>();
            res.json(orderServices);
        } catch(error) {
            next(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const orderService = await OrderService.findOne<OrderService>({ where: {orderServiceId: req.params.id} });
            res.json(orderService);
        } catch(error) {
            next(error);
        }
    }

    public async getByOrderId(req: express.Request, res: express.Response, next: express.NextFunction) {
      try {
          await this.orderMangager.recalculatePrice(req.params.id);
          const orderService = await OrderService.findAll<OrderService>({
             where: {orderId: req.params.id},
             include: [Device, DeviceModel, Service]
            });
          res.json(orderService);
      } catch(error) {
          next(error);
      }
  }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newOrderService = await this.orderServiceManager.createOrderService(req.body);
            res.json(newOrderService);
        } catch(error) {
            next(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const updatedOrderService = await this.orderServiceManager.updateOrderService(req.body);
            res.json(updatedOrderService);
        } catch(error) {
            next(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const orderService = this.orderServiceManager.deleteOrderService(req.params.id);
            res.json(orderService);
        } catch(error) {
            next(error);
        }
    }

    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.get("/:id", Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.get("/getByOrderId/:id", Auth.getBearerMiddleware(), this.getByOrderId.bind(this));
        this.router.post("/", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.put("/", Auth.getBearerMiddleware(), this.put.bind(this));
        this.router.delete("/:id", Auth.getBearerMiddleware(), this.delete.bind(this));
    }

}
