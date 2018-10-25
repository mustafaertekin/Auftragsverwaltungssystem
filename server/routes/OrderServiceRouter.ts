import * as express from "express";
import {OrderService} from "../models/entities/OrderService";
import {Auth} from "../auth/auth";
import {OrderServiceManager} from "../managers/OrderServiceManager";

export class OrderServiceRouter {

    public router: express.Router;
    private orderServiceManager: OrderServiceManager;


    constructor() {
        this.orderServiceManager = new OrderServiceManager();
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
            const orderService = await OrderService.findOne<OrderService>({ where: {orderServiceId: req.params.orderServiceId} });
            res.json(orderService);
        } catch(error) {
            next(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newOrderService = await this.orderServiceManager.createOrderService(
                req.body.orderServiceId,
                req.body.orderId,
                req.body.serviceId
            );
            res.json(newOrderService);
        } catch(error) {
            next(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const updatedOrderService = await this.orderServiceManager.updateOrderService(
                req.params.orderServiceId,
                req.body.orderId,
                req.body.serviceId
            );
            res.json(updatedOrderService);
        } catch(error) {
            next(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const orderService = this.orderServiceManager.deleteOrderService(req.params.orderServiceId);
            res.json(orderService);
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