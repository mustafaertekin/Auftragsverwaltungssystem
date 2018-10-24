import {Client} from "../models/entities/Client";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";

export class ClientManager {

    constructor() {
    }

    public async createClient(client: Client) {
        const newClient = new Client(client);
        return newClient.save();
    }

    public async updateClient(clientId: string, clientSecret: string) {
        const client = await Client.find<Client>({where: {clientId}});
        if(client) {
            client.clientSecret = clientSecret || client.clientSecret;

            return client.save();
        } else {
            logger.error("No client found");
            throw new NotFoundError("No client found with that id");
        }
    }

    public async deleteClient(clientId: string): Promise<Client | null> {
        const client = await Client.find<Client>({where: {clientId}});
        if(client) {
            await client.destroy();
            return client;
        } else {
            logger.error("No client found");
            throw new NotFoundError("No client found with that id");
        }
    }

    
}