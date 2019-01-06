import { OrderService } from "../models/entities/OrderService";
import { NotFoundError } from "../errors/NotFoundError";
import { logger } from "../lib/logger";
import { OrderManager } from "./OrderManager";
import * as _ from 'lodash';

export class OrderServiceManager {
  private orderManager: OrderManager;


  constructor() {
    this.orderManager = new OrderManager();
  }

  public async createOrderService(orderId: string, serviceId: string) {
    const newOrderService = new OrderService({
      orderId,
      serviceId
    });
    return newOrderService.save();
  }

  public async updateOrderService(body: any): Promise<OrderService> {
    const orderService = await OrderService.find<OrderService>({ where: { orderServiceId: body.orderServiceId } });
    if (orderService) {
      orderService.deviceId = body.device || orderService.deviceId;
      orderService.modelId = body.model || orderService.modelId;
      orderService.serviceId = body.service || orderService.serviceId;

      await orderService.save();
      console.log('*********************', orderService, _.get(orderService, 'dataValues.orderId', null));
      await this.orderManager.recalculatePrice(_.get(orderService, 'dataValues.orderId', null));

      return orderService;
    } else {
      logger.error("No order service model found");
      throw new NotFoundError("No orderService found with that id");
    }
  }

  public async findById(orderServiceId: string) {
    const orderService = await OrderService.findOne<OrderService>({ where: { orderServiceId: orderServiceId } });
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
    const orderService = await OrderService.find<OrderService>({ where: { orderServiceId } });
    if (orderService) {
      await orderService.destroy({
        force: true
      });
      await this.orderManager.recalculatePrice(_.get(orderService, 'dataValues.orderId', null));
      return orderService;
    } else {
      logger.error("No order service model found");
      throw new NotFoundError("No orderService found with that id");
    }
  }
}
