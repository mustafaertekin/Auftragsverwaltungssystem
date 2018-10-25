import * as express from "express";
import {Address} from "../models/entities/Address";
import {Auth} from "../auth/auth";
import {AddressManager} from "../managers/AddressManager";

export class AddressRouter {

    public router: express.Router;
    private addressManager: AddressManager;


    constructor() {
        this.addressManager = new AddressManager();
        this.router = express.Router();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const addresss = await Address.findAll<Address>();
            res.json(addresss);
        } catch(error) {
            next(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const address = await Address.findOne<Address>({ where: {addressId: req.params.addressId} });
            res.json(address);
        } catch(error) {
            next(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newAddress = await this.addressManager.createAddress(
                req.body.addressId,
                req.body.streetName,
                req.body.plzName,
                req.body.cityName,
                req.body.countryName,
                req.body.clientId,
                req.body.userId
            );
            res.json(newAddress);
        } catch(error) {
            next(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const updatedAddress = await this.addressManager.updateAddress(
                req.params.addressId,
                req.body.streetName,
                req.body.plzName,
                req.body.cityName,
                req.body.countryName,
                req.body.clientId,
                req.body.userId
            );
            res.json(updatedAddress);
        } catch(error) {
            next(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const address = this.addressManager.deleteAddress(req.params.addressId);
            res.json(address);
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
    }

}