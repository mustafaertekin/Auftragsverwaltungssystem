import * as express from "express";
import {Order} from "../models/entities/Order";
import {Auth} from "../auth/auth";
import {OrderManager} from "../managers/OrderManager";

export class OrderRouter {

    public router: express.Router;
    private orderManager: OrderManager;


    constructor() {
        this.orderManager = new OrderManager();
        this.router = express.Router();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const orders = await Order.findAll<Order>();
            res.json(orders);
        } catch(error) {
            next(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const order = await Order.findOne<Order>({ where: {orderId: req.params.id} });
            res.json(order);
        } catch(error) {
            next(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newOrder = await this.orderManager.createOrder(
                req.body.clientId,
                req.body.orderId,
                req.body.userId,
                req.body.deviceId,
                req.body.modelId,
                req.body.service,
                req.body.price,
                req.body.companyId,
                req.body.status,
                req.body.description
            );
            res.json(newOrder);
        } catch(error) {
            next(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const updatedOrder = await this.orderManager.updateOrder(
                req.params.id,
                req.body.clientId,
                req.body.userId,
                req.body.deviceId,
                req.body.modelId,
                req.body.service,
                req.body.price,
                req.body.companyId,
                req.body.status,
                req.body.description
            );
            res.json(updatedOrder);
        } catch(error) {
            next(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const order = this.orderManager.deleteOrder(req.params.id);
            res.json(order);
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