import * as express from "express";
import { Op, fn, col } from "sequelize";
import {Order} from "../models/entities/Order";
import {Client} from "../models/entities/Client";
import {Auth} from "../auth/auth";
import {ClientManager} from "../managers/ClientManager";
import * as _ from 'lodash';
import * as math from 'mathjs';
import * as moment from 'moment';

export class StatisticRouter {

    public router: express.Router;
    private clientManager: ClientManager;

    constructor() {
        this.clientManager = new ClientManager();
        this.router = express.Router();
        this.buildRoutes();
    }

    public async gain(req: express.Request, res: express.Response, next: express.NextFunction) {
      try {
        let orders: Order [] = await Order.findAll<Order>({
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
          return { index: index, sum: sum};
        });

        let fullMonths: any[] = [];
        for(let i = 0; i < 12; i++) {
          fullMonths[i] = { index:  i.toString(), sum: 0 };
        }
        _.map(summedMonats, (monat, i) => {
          fullMonths = _.map(fullMonths, (mnt)=> {
            if (_.get(mnt, 'index') === _.get(monat, 'index')) {
              mnt.sum = _.get(monat, 'sum');
            }
            return mnt;
          });
        });

        _.orderBy(fullMonths, 'index');
        const graphData = _.map(fullMonths, (mnt) => mnt.sum);
        res.json(graphData);
      } catch(error) {
          next(error);
      }
    }

    private buildRoutes() {
        this.router.get("/gain", Auth.getBearerMiddleware(), this.gain.bind(this));
    }

}
