import {DatabaseError as SequelizeError, ValidationError as SequelizeValidationError, Op} from "sequelize";
import * as express from "express";
import {Order} from "../models/entities/Order";
import {NotFoundError} from "../errors/NotFoundError";
import { Service } from "../models/entities/Service";
import { OrderStatus } from "../models/enums/OrderStatus";
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
import { DeviceModel } from "../models/entities/DeviceModel";
import { OrderService } from "../models/entities/OrderService";
import { Device } from "../models/entities/Device";
import * as bluebird from 'bluebird';
import * as _ from 'lodash';


export class OrderManager {

    constructor() {
    }

    public async recalculatePrice(orderId: string) {
      const order = await Order.findOne<Order>({
        where: {orderId},
        include: [
          {
            model: OrderService,
            include: [Service]
          },
        ]
    });
      const services = _.get(order, 'orderServices', []);
      const cleanServices = _.map(services, (service) => _.get(service, 'dataValues'));
      const price = cleanServices.reduce((sum, curr)=> {
        sum += _.get(curr, 'Service.dataValues.price', 0);
        return sum;
      }, 0);

      if(order) {
        order.price = price;
        return await order.save();
      }
      return null;
    }

    public async createOrder(reqObject) {
        try {
          let services = reqObject.body.addedServices;
          const resolvedServices = await bluebird.all(services.map(item => {
            return new ServiceManager().findById(item.serviceId);
          }));

          const price = resolvedServices.reduce((sum, curr)=> {
            sum += _.get(curr, 'dataValues.price', 0); return sum;
          }, 0);

          const userId = _.get(reqObject, 'user.dataValues.userId');
          const clientId = reqObject.body.clientId;
          const deliveryAddress = reqObject.body.deliveryAddress;
          const invoiceAddress = reqObject.body.invoiceAddress;
          // TODO here needs to get company id programatically
          const companyId = "10e0e993-b796-4168-b017-2b15b1640ccc";

          const newOrder = new Order({
                  clientId: clientId,
                  userId: userId,
                  price,
                  companyId: companyId,
                  status: OrderStatus.OPENED,
                  deliveryAddressId: deliveryAddress,
                  billingAddressId: invoiceAddress,
                  description: 'not yet implemented',
                  deliveryDate: reqObject.body.deliveryDate
          });
          const savedOrder = await newOrder.save();

          services = services.map(service => {
            return {
              orderId: _.get(savedOrder, 'dataValues.orderId'),
              deviceId: service.deviceId,
              modelId: service.deviceModelId,
              serviceId: service.serviceId
            };
          });
          await OrderService.bulkCreate(services, { ignoreDuplicates: true });
          return savedOrder;
        } catch (error) {
            throw new Error(error);
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
          dbOrder.deliveryDate = order.deliveryDate || dbOrder.deliveryDate;

            return dbOrder.save();
        } else {
            logger.error("No order found");
            throw new NotFoundError("No order found with that id");
        }
    }

    public async searchByText(req: express.Request, res: express.Response, next: express.NextFunction) {
      try{
        const result = await Order.findAll({
          where: {
            [Op.or] : {
              '$Client.firstName$': { [Op.like]: `%${req.params.text}%`},
              '$Client.lastName$': { [Op.like]: `%${req.params.text}%`},
              '$Client.phone$': { [Op.like]: `%${req.params.text}%`},
              '$Client.email$': { [Op.like]: `%${req.params.text}%`},
              '$Client.addresses.streetName$': { [Op.like]: `%${req.params.text}%`},
              '$Client.addresses.plzNumber$': { [Op.like]: `%${req.params.text}%`},
              '$Client.addresses.cityName$': { [Op.like]: `%${req.params.text}%`},
              '$Client.addresses.countryName$': { [Op.like]: `%${req.params.text}%`},
              '$OrderServices.device.deviceName$': { [Op.like]: `%${req.params.text}%`},
              '$OrderServices.deviceModel.deviceModelName$': { [Op.like]: `%${req.params.text}%`},
              '$OrderServices.service.serviceName$': { [Op.like]: `%${req.params.text}%`},
              '$Company.name$': { [Op.like]: `%${req.params.text}%`},
              '$Order.price$': { [Op.like]: `%${req.params.text}%`},
              '$Order.orderId$': { [Op.like]: `%${req.params.text}%`},
              '$Order.deliveryDate$': { [Op.like]: `%${req.params.text}%`},
              '$Order.status$': { [Op.like]: `%${req.params.text}%`},
            }
          },
          include: [
            {
              model: Client,
              include: [Address]
            },
            User,
            Address,
            {
              model: OrderService,
              include: [Device, DeviceModel, Service]
            },
            Company
          ]
        });
        return result;
      } catch(err) {
        next(err);
      }
    }

    public async findById(orderId: string) {
        let order = await Order.findOne<Order>({
            where: {orderId},
            include: [
              {
                model: Client,
                include: [Address]
              },
              User,
              Address,
              {
                model: OrderService,
                include: [Device, DeviceModel, Service]
              },
               Company
            ]
        });
        if (order) {
          const deliveryAddres = order.client.addresses
                                .find(address => address.addressId === _.get(order,'deliveryAddressId'));
          const billingAddress = order.client.addresses
                                .find(address => address.addressId === _.get(order,'billingAddressId'));

          order = _.set(order, 'deliveryAddressId', deliveryAddres);
          order = _.set(order, 'billingAddressId', billingAddress);
          return order;
        } else {
            logger.error("No order found with the provided id");
            throw new NotFoundError("No order found with the provided id");
        }
    }

    public async findAll(): Promise<Order[]> {
        const orders: Order[] = await Order.findAll<Order>({
          include:[ Client],
          order: [
             ['creationDate', 'DESC']
          ],
          // where: { `client`.`isActive` : true }
        });
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
