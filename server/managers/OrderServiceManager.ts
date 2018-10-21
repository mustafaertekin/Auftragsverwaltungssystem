import {OrderService} from "../models/entities/OrderService";
import {NotFoundError} from "../errors/NotFoundError";

export class OrderServiceManager {

    constructor() {
    }

    public async createOrderService(orderServiceId: string, orderId: string, serviceId: string) {
        const newOrderService = new OrderService({
            orderServiceId,
            orderId,
            serviceId
        });
        return newOrderService.save();
    }

    public async updateOrderService(orderServiceId: string, orderId: string, serviceId: string) {
        const orderService = await OrderService.find<OrderService>({where: {orderServiceId: orderServiceId}});
        if(orderService) {
            orderService.orderServiceId = orderServiceId;
            orderService.orderId = orderId;
            orderService.serviceId = serviceId;
            
            return orderService.save();
        } else {
            throw new NotFoundError("No orderService found with that id");
        }
    }

    public async deleteOrderService(orderServiceId) {
        const orderService = await OrderService.find<OrderService>({where: {orderServiceId: orderServiceId}});
        if(orderService) {
            return orderService.destroy();
        } else {
            throw new NotFoundError("No orderService found with that id");
        }
    }
}