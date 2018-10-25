import {OrderService} from "../models/entities/OrderService";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";

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

    public async updateOrderService(orderServiceId: string, orderId: string, serviceId: string): Promise<OrderService> {
        const orderService = await OrderService.find<OrderService>({where: {orderServiceId}});
        if(orderService) {
            orderService.orderServiceId = orderServiceId || orderService.orderServiceId;
            orderService.orderId = orderId || orderService.orderId;
            orderService.serviceId = serviceId || orderService.serviceId;
            
            return orderService.save();
        } else {
            logger.error("No order service model found");
            throw new NotFoundError("No orderService found with that id");
        }
    }

    public async findById(orderServiceId: string) {
        const orderService = await OrderService.findOne<OrderService>({where: {orderServiceId: orderServiceId}});
        if (orderService) {
            return orderService;
        } else {
            logger.error("No order service found with the provided id");
            throw new NotFoundError("No order service found with the provided id");
        }
    }

    public async findAll(): Promise<OrderService[]> {
        const orderServices: OrderService[] = await OrderService.findAll<OrderService>({});
        if (orderServices) {
            return orderServices;
        } else {
            logger.error("No order services found");
            throw new NotFoundError("No order services found");
        }
    }

    public async deleteOrderService(orderServiceId: string): Promise<OrderService | null> {
        const orderService = await OrderService.find<OrderService>({where: {orderServiceId}});
        if(orderService) {
            await orderService.destroy();
            return orderService;
        } else {
            logger.error("No order service model found");
            throw new NotFoundError("No orderService found with that id");
        }
    }
}