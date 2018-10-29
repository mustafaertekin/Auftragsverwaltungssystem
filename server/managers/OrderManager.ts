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
import { DeviceModel } from "../models/entities/DeviceModel";
import { MessageError } from "../errors/MessageError";
import { Client } from "../models/entities/Client";
import { Company } from "../models/entities/Company";
import { Device } from "../models/entities/Device";


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
                // console.log('objects ===>>>', user, client, device, model, service, company);
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
            logger.error("No order found");
            throw new NotFoundError("No order found with that id");
        }
    }

    public async findById(orderId: string) {
        const order = await Order.findOne<Order>({where: {orderId}});
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