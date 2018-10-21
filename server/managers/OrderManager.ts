import {Order} from "../models/entities/Order";
import {NotFoundError} from "../errors/NotFoundError";
import { Service } from "../models/entities/Service";
import { OrderStatus } from "models/enums/OrderStatus";

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

    public async updateOrder(orderId: string, clientId: string, userId: string, deviceId: string, modelId: string, service: Service[], price: string, companyId: string, status: OrderStatus, description: string) {
        const order = await Order.find<Order>({where: {orderId: orderId}});
        if(order) {
            order.orderId = orderId;
            order.clientId = clientId;
            order.userId = userId;
            order.deviceId = deviceId;
            order.modelId = modelId;
            order.service = service;
            order.price = price;
            order.companyId = companyId;
            order.status = status;
            order.description = description;
            return order.save();
        } else {
            throw new NotFoundError("No order found with that id");
        }
    }

    public async deleteOrder(orderId) {
        const order = await Order.find<Order>({where: {orderId: orderId}});
        if(order) {
            return order.destroy();
        } else {
            throw new NotFoundError("No order found with that id");
        }
    }
}