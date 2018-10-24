import {Service} from "../models/entities/Service";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";

export class ServiceManager {

    constructor() {
    }

    public async createService(serviceId: string, description: string, order: string ) {
        const newService = new Service({
            serviceId,
            description,
            order
        });
        return newService.save();
    }

    public async updateService(serviceId: string, description: string, order: string): Promise<Service> {
        const service = await Service.find<Service>({where: {serviceId}});
        if(service) {
            service.serviceId = serviceId || service.serviceId;
            service.description = description || service.description;
            service.order = order || service.order;
            
            return service.save();
        } else {
            logger.error("No service model found");
            throw new NotFoundError("No service found with that id");
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