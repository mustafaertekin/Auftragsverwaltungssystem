import * as express from "express";
import * as sequelize from "sequelize";
import { Client } from "../models/entities/Client";
import { OrderService } from "../models/entities/OrderService";
import { Device } from "../models/entities/Device";
import { DeviceModel } from "../models/entities/DeviceModel";
import { Order } from "../models/entities/Order";
import { Auth } from "../auth/auth";
import { ClientManager } from "../managers/ClientManager";
import * as _ from 'lodash';
import * as math from 'mathjs';
import * as moment from 'moment';
import { Service } from "../models/entities/Service";

export class StatisticRouter {

  public router: express.Router;
  private clientManager: ClientManager;

  constructor() {
    this.router = express.Router();
    this.buildRoutes();
  }

  public async gain(req: express.Request, res: express.Response, next: express.NextFunction) {
    const statistics = {
      gain: await this.getGainMonatly(req, res, next),
      statuses: await this.getStatusStatistics(),
      services: await this.getClientStatistics()
    };
    res.json(statistics);
  }

  private async getGainMonatly(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      let orders: Order[] = await Order.findAll<Order>({
        where: {
          creationDate: {
            $gte: moment(new Date('2018-12-31')).toDate()
          }
        }
      });
      orders = orders.map(order => _.get(order, 'dataValues'));
      const ordered = _.groupBy(orders, (elm) => { return new Date(elm.creationDate).getMonth(); });
      const summedMonats = _.map(ordered, (monat, index) => {
        const sum = monat.reduce((sum, curr) => {
          sum += math.eval(curr.price);
          return sum;
        }, 0);
        return { index: index, sum: sum };
      });

      let fullMonths: any[] = [];
      for (let i = 0; i < 12; i++) {
        fullMonths[i] = { index: i.toString(), sum: 0 };
      }
      _.map(summedMonats, (monat, i) => {
        fullMonths = _.map(fullMonths, (mnt) => {
          if (_.get(mnt, 'index') === _.get(monat, 'index')) {
            mnt.sum = _.get(monat, 'sum');
          }
          return mnt;
        });
      });

      _.orderBy(fullMonths, 'index');
      const graphData = _.map(fullMonths, (mnt) => mnt.sum);
      return graphData;
    } catch (error) {
      next(error);
    }
  }

  private async getStatusStatistics() {
    return await Order.findAll<Order>({
      attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'cnt']],
      group: ['status']
    });
  }

  private async getClientStatistics() {
    let services = await OrderService.findAll<OrderService>({
      include: [
        { model: Service, attributes: ['serviceName', 'serviceId',] },
        { model: Device, attributes: ['deviceName'] },
        { model: DeviceModel, attributes: ['deviceModelName'] }
      ],
      attributes: [
        'creationDate',
        [sequelize.fn('COUNT', sequelize.col('OrderService.creationDate')), 'count']
      ],
      group: ['Service.serviceId']
      // , sequelize.literal('strftime("%Y %m", `OrderService`.`creationDate`)')],
    });

    services = services.map(service => _.get(service, 'dataValues'));
    const names = services.map(service => {
      return `${ _.get(service, 'Service.serviceName', '')} - ${ _.get(service, 'device.deviceName', '')} - ${ _.get(service, 'deviceModel.deviceModelName', '')}`;
    });

    const values = services.map(service => {
      return _.get(service, 'count', 0);
    });
    return { names, values };
  }
  private buildRoutes() {
    this.router.get("/gain", Auth.getBearerMiddleware(), this.gain.bind(this));
  }
}
