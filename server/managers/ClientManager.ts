import {Op} from "sequelize";
import * as express from "express";
import {Client} from "../models/entities/Client";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";
import {Address} from "../models/entities/Address";
import {Order} from "../models/entities/Order";

export class ClientManager {

    constructor() {
    }

    public async createClient(client: Client) {
        const newClient = new Client(client);
        return newClient.save();
    }

    public async updateClient(clientId: string, client: Client): Promise <Client> {
        const dbclient = await Client.find<Client>({where: { clientId }});
        
        if(dbclient) {
            dbclient.clientSecret = client.clientSecret || dbclient.clientSecret;
            dbclient.salutation = client.salutation || dbclient.salutation;
            dbclient.email = client.email || dbclient.email;
            dbclient.lastName = client.lastName || dbclient.lastName;
            dbclient.firstName = client.firstName || dbclient.firstName;
            dbclient.phone = client.phone || dbclient.phone;
            dbclient.isActive = client.isActive
            return await dbclient.save();
        } else {
            logger.error("No client found");
            throw new NotFoundError("No client found with that id");
        }
    }

    public async findById(clientId: string): Promise<Client> {
        const client = await Client.findOne<Client>({where: {clientId}});
        if (client) {
            return client;
        } else {
            logger.error("No client found with the provided id");
            throw new NotFoundError("No client found with the provided id");
        }
    }

    public async findAll(): Promise<Client[]> {
        const clients: Client[] = await Client.findAll<Client>({});
        if (clients) {
            return clients;
        } else {
            logger.error("No client found");
            throw new NotFoundError("No client found");
        }
    }

    public async getOrders(itemId): Promise<Order[]> {
      const orders = await Order.findAll<Order>({
        where: {
          [Op.or] : {
            clientId: itemId,
            userId: itemId,
          }
        }});
      if (orders) {
        return orders;
    } else {
        logger.error("No orders found");
        throw new NotFoundError("No orders found");
    }
    }

    public async deleteClient(clientId: string): Promise<Client | null> {
        const client = await Client.find<Client>({where: {clientId}});
        if(client) {
            client.isActive = false;
            await client.save();
            return client;
        } else {
            logger.error("No client found");
            throw new NotFoundError("No client found with that id");
        }
    }

    public async search(req: express.Request, res: express.Response, next: express.NextFunction) {
      try{
        const result = await Client.findAll({
          where: {
            [Op.or] : {
              '$Client.clientId$': { [Op.like]: `%${req.params.text}%`},
              '$Client.firstName$': { [Op.like]: `%${req.params.text}%`},
              '$Client.lastName$': { [Op.like]: `%${req.params.text}%`},
              '$Client.phone$': { [Op.like]: `%${req.params.text}%`},
              '$Client.email$': { [Op.like]: `%${req.params.text}%`},
              '$addresses.streetName$': { [Op.like]: `%${req.params.text}%`},
              '$addresses.plzNumber$': { [Op.like]: `%${req.params.text}%`},
              '$addresses.cityName$': { [Op.like]: `%${req.params.text}%`},
              '$addresses.countryName$': { [Op.like]: `%${req.params.text}%`}
            }
          },
          include: [Address]
        });
        return result;
      } catch(err) {
        next(err);
      }
    }
}
