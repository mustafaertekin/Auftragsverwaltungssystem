import {Client} from "../models/entities/Client";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";
import {Address} from "../models/entities/Address";

export class ClientManager {

    constructor() {
    }

    public async createClient(client: Client) {
        const newClient = new Client(client);
        return newClient.save();
    }

    public async updateClient(clientId: string, clientSecret: string, clientEmail: string, clientName: string, clientTelefon: string, addressId: string): Promise <Client> {
        const client = await Client.find<Client>({where: {clientId}});
        if(client) {
            client.clientSecret = clientSecret || client.clientSecret;
            client.clientEmail = clientEmail || client.clientEmail;
            client.clientName = clientName || client.clientName;
            client.clientTelefon = clientTelefon || client.clientTelefon;
            client.addressId = addressId || client.addressId;

            return client.save();
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