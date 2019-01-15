import * as express from "express";
import {Client} from "../models/entities/Client";
import {Auth} from "../auth/auth";
import {ClientManager} from "../managers/ClientManager";
import {Roles} from "../auth/roles";

export class ClientRouter {

    public router: express.Router;
    private clientManager: ClientManager;

    constructor() {
        this.clientManager = new ClientManager();
        this.router = express.Router();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const clients = await Client.findAll<Client>();
            res.json(clients);
        } catch(error) {
            next(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const client = await Client.findOne<Client>({ where: {clientId: req.params.id} });
            res.json(client);
        } catch(error) {
            next(error);
        }
    }

    public async getOrders(req: express.Request, res: express.Response, next: express.NextFunction) {
      try {
        const orders = await this.clientManager.getOrders(req.params.id);
        res.json(orders);
      } catch(error) {
          next(error);
      }
    }

    public async search(req: express.Request, res: express.Response, next: express.NextFunction) {
      try {
        const clients = await this.clientManager.search(req, res, next);
        res.json(clients);
      } catch(error) {
          next(error);
      }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newClient = await this.clientManager.createClient(req.body);
            res.json(newClient);
        } catch(error) {
            next(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
          const updatedClient = await this.clientManager.updateClient(req.params.id, req.body);
          res.json(updatedClient);
        } catch(error) {
            next(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const client = this.clientManager.deleteClient(req.params.id);
            res.json(client);
        } catch(error) {
            next(error);
        }
    }

    private buildRoutes() {
        this.router.get("/", Auth.getBearerMiddleware(), Roles.connectRoles.can('everyone'), this.get.bind(this));
        this.router.get("/:id", Auth.getBearerMiddleware(), Roles.connectRoles.can('everyone'), this.getById.bind(this));
        this.router.get("/orders/:id", Auth.getBearerMiddleware(), Roles.connectRoles.can('everyone'), this.getOrders.bind(this));
        this.router.get("/search/:text", Auth.getBearerMiddleware(), Roles.connectRoles.can('everyone'), this.search.bind(this));
        this.router.post("/", Auth.getBearerMiddleware(), Roles.connectRoles.can('everyone'), this.post.bind(this));
        this.router.put("/:id", Auth.getBearerMiddleware(), Roles.connectRoles.can('everyone'), this.put.bind(this));
        this.router.delete("/:id", Auth.getBearerMiddleware(), Roles.connectRoles.can('admin'), this.delete.bind(this));
    }

}
