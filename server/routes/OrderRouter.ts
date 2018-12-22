import * as express from "express";
import * as nodemailer from "nodemailer";
import {Order} from "../models/entities/Order";
import {Auth} from "../auth/auth";
import {OrderManager} from "../managers/OrderManager";
import * as _ from 'lodash';
import { Client } from "../models/entities/Client";
import * as pdf from 'html-pdf';
import * as moment from 'moment';

export class OrderRouter {

    public router: express.Router;
    private orderManager: OrderManager;


    constructor() {
        this.orderManager = new OrderManager();
        this.router = express.Router();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const orders = await Order.findAll<Order>(
              {
                include:[Client],
                order: [
                  ['creationDate', 'DESC']
                ]
              }
            );
            res.json(orders);
        } catch(error) {
            next(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const order = await this.orderManager.findById(req.params.id);
            res.json(order);
        } catch(error) {
            next(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newOrder = await this.orderManager.createOrder(req);
            res.json(newOrder);
        } catch(error) {
            next(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const updatedOrder = await this.orderManager.updateOrder(
                req.params.id, req.body );
            res.json(updatedOrder);
        } catch(error) {
            next(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const order = await this.orderManager.deleteOrder(req.params.id);
            res.json(order);
        } catch(error) {
            next(error);
        }
    }

    public async mail(req: express.Request, res: express.Response, next: express.NextFunction) {
      try {
        let order = await this.orderManager.findById(req.params.id);
        order = _.set(order, 'deliveryDate', moment(new Date(order.deliveryDate)).format('YYYY-MM-DD'));
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'auftragpro@gmail.com',
            pass: 'auftrag123pro'
          }
        });

        res.render('pdfs/order', { order: order}, function(err, html) {
          const mailOptions = {
            from: 'auftragpro@gmail.com',
            to: _.get(order, 'client.email'),
            subject: 'AVS - Your order is on its way!',
            html: html,
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              throw new Error(`Could not send Email ${error}`);
            } else {
              res.status(200).send(`Email is sent successfully, ${info}`);
            }
          });
        });
      } catch(error) {
          next(error);
      }
  }

    public async download(req: express.Request, res: express.Response, next: express.NextFunction) {
      try {
          let order = await this.orderManager.findById(req.params.id);
          order = _.set(order, 'deliveryDate', moment(new Date(order.deliveryDate)).format('YYYY-MM-DD'));
          res.render('pdfs/order', { order: order}, function(err, html) {
            if(err){
              throw new Error(`could not render pdf file, err: ${err}`);
            }
            pdf.create(html, { format: 'Letter' }).toStream(function(err, stream){
              res.setHeader('Content-type', 'application/pdf');
              stream.pipe(res);
            });
          });
      } catch(error) {
          next(error);
      }
    }

    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.get("/:id", Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.post("/", Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.put("/:id", Auth.getBearerMiddleware(), this.put.bind(this));
        this.router.delete("/:id", Auth.getBearerMiddleware(), this.delete.bind(this));
        this.router.get("/download/:id", Auth.getBearerMiddleware(), this.download.bind(this));
        this.router.post("/mail/:id", Auth.getBearerMiddleware(), this.mail.bind(this));
    }

}
