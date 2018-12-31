import * as express from "express";
import {Address} from "../models/entities/Address";
import {NotFoundError} from "../errors/NotFoundError";
import {logger} from "../lib/logger";
import * as _ from 'lodash';

export class AddressManager {

    constructor() {
    }

    public async createAddress(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userId = _.get(req, 'user.dataValues.userId');
        const address = req.body;
        // address.userId = userId;
        const newAddress = new Address(address);
        return newAddress.save();
    }

    public async updateAddress(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Address> {
      const userId = _.get(req, 'user.dataValues.userId');
      const updateInfo = req.body;
      const address = await Address.find<Address>({where: {addressId: req.params.id}});
      const addressInfo = _.get(address, 'dataValues');
      if(address) {
          address.streetName = updateInfo.streetName || addressInfo.streetName;
          address.plzNumber = updateInfo.plzNumber || addressInfo.plzNumber;
          address.cityName = updateInfo.cityName || addressInfo.cityName;
          address.countryName = updateInfo.countryName || addressInfo.countryName;
          address.clientId = updateInfo.clientId || addressInfo.clientId;
          // address.userId = userId;

          return address.save();
      } else {
          logger.error("No address found");
          throw new NotFoundError("No address found with that id");
      }
    }

    public async findById(addressId: string) {
        const address = await Address.findOne<Address>({where: {addressId: addressId}});
        if (address) {
            return address;
        } else {
            logger.error("No address found with the provided id");
            throw new NotFoundError("No address found with the provided id");
        }
    }

    public async findAll(): Promise<Address[]> {
        const addresses: Address[] = await Address.findAll<Address>({});
        if (addresses) {
            return addresses;
        } else {
            logger.error("No user found");
            throw new NotFoundError("No address found");
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
