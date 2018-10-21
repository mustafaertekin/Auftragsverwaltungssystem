import {Address} from "../models/entities/Address";
import {NotFoundError} from "../errors/NotFoundError";

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

    public async updateAddress(addressId: string, streetName: string, plzNumber: string, cityName: string, countryName: string, clientId: string, userId: string) {
        const address = await Address.find<Address>({where: {addressId: addressId}});
        if(address) {
            address.addressId = addressId;
            address.streetName = streetName;
            address.plzNumber = plzNumber;
            address.cityName = cityName;
            address.countryName = countryName;
            address.clientId = clientId;
            address.userId = userId;
            
            return address.save();
        } else {
            throw new NotFoundError("No address found with that id");
        }
    }

    public async deleteAddress(addressId) {
        const address = await Address.find<Address>({where: {addressId: addressId}});
        if(address) {
            return address.destroy();
        } else {
            throw new NotFoundError("No address found with that id");
        }
    }
}