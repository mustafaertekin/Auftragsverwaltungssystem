import {Order} from "../models/entities/Order";
import {NotFoundError} from "../errors/NotFoundError";
import { Service } from "../models/entities/Service";
import { OrderStatus } from "models/enums/OrderStatus";
import {logger} from "../lib/logger";

export class OrderManager {

    constructor() {
    }

    public async createOrder(orderId: string, clientId: string, userId: string, deviceId: string, modelId: string, service: Service, price: string, companyId: string, status: OrderStatus, description: string ) {
        const newOrder = new Order({
            orderId,
            clientId,
            userId,
            deviceId,
            modelId,
            service,
            price,
            companyId,
            status,
            description
             });
        return newOrder.save();
    }

    public async updateOrder(orderId: string, clientId: string, userId: string, deviceId: string, modelId: string, service: Service[], price: string, companyId: string, status: OrderStatus, description: string): Promise<Order> {
        const order = await Order.find<Order>({where: {orderId}});
        if(order) {
            order.clientId = clientId || order.clientId;
            order.userId = userId || order.userId;
            order.deviceId = deviceId || order.deviceId;
            order.modelId = modelId || order.modelId;
            order.service = service || order.service;
            order.price = price || order.price;
            order.companyId = companyId || order.companyId;
            order.status = status || order.status;
            order.description = description || order.description;

            return order.save();
        } else {
            logger.error("No order model found");
            throw new NotFoundError("No order found with that id");
        }
    }

    public async findById(orderId: string) {
        const order = await Order.findOne<Order>({where: {orderId: orderId}});
        if (order) {
            return order;
        } else {
            logger.error("No order found with the provided id");
            throw new NotFoundError("No order found with the provided id");
        }
    }

    public async findAll(): Promise<Order[]> {
        const orders: Order[] = await Order.findAll<Order>({});
        if (orders) {
            return orders;
        } else {
            logger.error("No order found");
            throw new NotFoundError("No order found");
        }
    }

    public async deleteOrder(orderId: string): Promise<Order> {
        const order = await Order.find<Order>({where: {orderId: orderId}});
        if(order) {
            await order.destroy();
            return order;
        } else {
            logger.error("No order model found");
            throw new NotFoundError("No order found with that id");
        }
    }
}