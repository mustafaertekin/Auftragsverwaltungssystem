import {DatabaseError as SequelizeError, ValidationError as SequelizeValidationError} from "sequelize";

import {Order} from "../models/entities/Order";
import {NotFoundError} from "../errors/NotFoundError";
import { Service } from "../models/entities/Service";
import { OrderStatus } from "models/enums/OrderStatus";
import {logger} from "../lib/logger";
import { UserManager } from "./UserManager";
import { ClientManager } from "./ClientManager";
import { DeviceManager } from "./DeviceManager";
import { DeviceModelManager } from "./DeviceModelManager";
import { ServiceManager } from "./ServiceManager";
import { CompanyManager } from "./CompanyManager";
import { Address } from "../models/entities/Address";
import { MessageError } from "../errors/MessageError";
import { Client } from "../models/entities/Client";
import { Company } from "../models/entities/Company";
import { User } from "../models/entities/User";


export class OrderManager {

    constructor() {
    }

    public async createOrder(clientId: string, userId: string, deviceId: string, modelId: string, serviceId: string, price: string, companyId: string, status: OrderStatus, description: string ) {
        try {

                const user = await new UserManager().findById(userId);
                const client = await new ClientManager().findById(clientId);
                const device = await new DeviceManager().findById(deviceId);
                const model = await new DeviceModelManager().findById(modelId);
                const service = await new ServiceManager().findById(serviceId);
                const company = await new CompanyManager().findById(companyId);
                /*
                if(user && client && device && model && service && company) {
                    return new Error('sunlari adam gibi doldur yea!');
                }
                */
                const newOrder = new Order({
                        clientId: client.clientId,
                        userId: user.userId,
                        deviceId: device.deviceId,
                        modelId: model.deviceModelId,
                        serviceId: service.serviceId,
                        price,
                        companyId: company.companyId,
                        status,
                        description
                });
                return newOrder.save();
        } catch (error) {
            return new Error(error);
        }

    }

    public async updateOrder(orderId: string,  order: Order): Promise<Order> {
        const dbOrder = await Order.find<Order>({where: {orderId}});
        if(dbOrder) {
          dbOrder.clientId = order.clientId || dbOrder.clientId;
          dbOrder.userId = order.userId || dbOrder.userId;
          dbOrder.billingAddressId = order.billingAddressId || dbOrder.billingAddressId;
          dbOrder.deliveryAddressId = order.deliveryAddressId || dbOrder.deliveryAddressId;
          dbOrder.price = order.price || dbOrder.price;
          dbOrder.companyId = order.companyId || dbOrder.companyId;
          dbOrder.status = order.status || dbOrder.status;
          dbOrder.description = order.description || dbOrder.description;

            return dbOrder.save();
        } else {
            logger.error("No order found");
            throw new NotFoundError("No order found with that id");
        }
    }

    public async findById(orderId: string) {
        const order = await Order.findOne<Order>({
            where: {orderId},
            include: [Client, User, Address, Company, Service]
        });
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
