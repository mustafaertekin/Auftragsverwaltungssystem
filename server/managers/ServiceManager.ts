import {Service} from "../models/entities/Service";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";
import { Order } from "models/entities/Order";

export class ServiceManager {

    constructor() {
    }

    public async createService(description: string, order: string ) {
        const newService = new Service({
            description,
            order
        });
        return newService.save();
    }

    public async updateService(serviceId: string, description: string, order: Order[]): Promise<Service> {
        const service = await Service.find<Service>({where: {serviceId}});
        if(service) {
            service.description = description || service.description;
            service.order = order || service.order;
            
            return service.save();
        } else {
            logger.error("No service model found");
            throw new NotFoundError("No service found with that id");
        }
    }

    public async findById(serviceId: string) {
        const service = await Service.findOne<Service>({where: {serviceId: serviceId}});
        if (service) {
            return service;
        } else {
            logger.error("No service found with the provided id");
            throw new NotFoundError("No service found with the provided id");
        }
    }

    public async findAll(): Promise<Service[]> {
        const services: Service[] = await Service.findAll<Service>({});
        if (services) {
            return services;
        } else {
            logger.error("No service found");
            throw new NotFoundError("No service");
        }
    }

    public async deleteService(serviceId: string): Promise<Service> {
        const service = await Service.find<Service>({where: {serviceId}});
        if(service) {
            await service.destroy();
            return service;
        } else {
            logger.error("No service model found");
            throw new NotFoundError("No service found with that id");
        }
    }
}