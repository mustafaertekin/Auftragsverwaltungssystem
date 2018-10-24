import {Address} from "../models/entities/Address";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";

export class AddressManager {

    constructor() {
    }

    public async createAddress(addressId: string, streetName: string, plzName: string, cityName: string, countryName: string, clientId: string, userId: string) {
        const newAddress = new Address({
            addressId,
            streetName,
            plzName,
            cityName,
            countryName,
            clientId,
            userId
        });
        return newAddress.save();
    }

    public async updateAddress(addressId: string, streetName: string, plzNumber: string, cityName: string, countryName: string, clientId: string, userId: string): Promise<Address> {
        const address = await Address.find<Address>({where: {addressId}});
        if(address) {
            address.streetName = streetName || address.streetName;
            address.plzNumber = plzNumber || address.plzNumber;
            address.cityName = cityName || address.cityName;
            address.countryName = countryName || address.countryName;
            address.clientId = clientId || address.clientId;
            address.userId = userId || address.userId;
            
            return address.save();
        } else {
            logger.error("No address found");
            throw new NotFoundError("No address found with that id");
        }
    }

    public async deleteAddress(addressId: string): Promise<Address | null> {
        const address = await Address.find<Address>({where: {addressId}});
        if(address) {
            await address.destroy();
            return address;
        } else {
            logger.error("No address found");
            throw new NotFoundError("No address found with that id");
        }
    }
}