import * as express from "express";
import {Order} from "../models/entities/Order";
import {Auth} from "../auth/auth";
import {OrderManager} from "../managers/OrderManager";
import * as _ from 'lodash';
import { Client } from "../models/entities/Client";

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
            const orders = await Order.findAll<Order>(
              {
                include:[Client],
                order: [
                  ['creationDate', 'DESC']
                ]
              }
            );
            res.json(orders);
        } catch(error) {
            next(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const order = await this.orderManager.findById(req.params.id);
            res.json(order);
        } catch(error) {
            next(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newOrder = await this.orderManager.createOrder(req);
            res.json(newOrder);
        } catch(error) {
            next(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const updatedOrder = await this.orderManager.updateOrder(
                req.params.id, req.body );
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
