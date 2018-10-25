import * as express from "express";
import {Company} from "../models/entities/Company";
import {Auth} from "../auth/auth";
import {CompanyManager} from "../managers/CompanyManager";

export class CompanyRouter {

    public router: express.Router;
    private companyManager: CompanyManager;


    constructor() {
        this.companyManager = new CompanyManager();
        this.router = express.Router();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const companys = await Company.findAll<Company>();
            res.json(companys);
        } catch(error) {
            next(error);
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const company = await Company.findOne<Company>({ where: {companyId: req.params.companyId} });
            res.json(company);
        } catch(error) {
            next(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newCompany = await this.companyManager.createCompany(
                req.body.companyId,
                req.body.name,
                req.body.addressId
            );
            res.json(newCompany);
        } catch(error) {
            next(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const updatedCompany = await this.companyManager.updateCompany(
                req.params.companyId,
                req.body.name,
                req.body.addressId
            );
            res.json(updatedCompany);
        } catch(error) {
            next(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const company = this.companyManager.deleteCompany(req.params.companyId);
            res.json(company);
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