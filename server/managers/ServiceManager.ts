import {Service} from "../models/entities/Service";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";
import { Order } from "models/entities/Order";

export class ServiceManager {

    constructor() {
    }

    public async createService(service: Service, modelId: string) {
        const newService = new Service({
          modelId: modelId,
          serviceName: service.serviceName,
          price: service.price
        });
        return newService.save();
    }

    public async updateService(service: Service): Promise<Service> {
        const dbService = await Service.find<Service>({where: {serviceId: service.serviceId}});
        if(dbService) {
          dbService.serviceName = service.serviceName || dbService.serviceName;
          dbService.price = service.price || dbService.price ;

            return dbService.save();
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
