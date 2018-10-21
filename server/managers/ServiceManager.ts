import {Service} from "../models/entities/Service";
import {NotFoundError} from "../errors/NotFoundError";

export class ServiceManager {

    constructor() {
    }

    public async createService(serviceId, description, order ) {
        const newService = new Service({
            serviceId,
            description,
            order
        });
        return newService.save();
    }

    public async updateService(serviceId, description, order) {
        const service = await Service.find<Service>({where: {serviceId: serviceId}});
        if(service) {
            service.serviceId = serviceId;
            service.description = description;
            service.order = order;
            
            return service.save();
        } else {
            throw new NotFoundError("No service found with that id");
        }
    }

    public async deleteService(serviceId) {
        const service = await Service.find<Service>({where: {serviceId: serviceId}});
        if(service) {
            return service.destroy();
        } else {
            throw new NotFoundError("No service found with that id");
        }
    }
}