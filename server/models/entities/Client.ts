import {AllowNull, BeforeSave, Column, Table, HasMany, Unique, ForeignKey, Default, DataType, PrimaryKey, IsUUID} from 'sequelize-typescript';
import {Utils} from "../../utils";
import {BaseModel} from "./BaseModel";
import { Address } from './Address';
import { Order } from './Order';

@Table
export class Client extends BaseModel<Client> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    clientId: string;

    @AllowNull(true)
    @Column
    clientSecret: string;

    @AllowNull(true)
    @Column
    salutation: string;

    @AllowNull(false)
    @Column
    firstName: string;

    @AllowNull(false)
    @Column
    lastName: string;

    @AllowNull(false)
    @Column
    phone: string; 

    @AllowNull(false)
    @Unique
    @Column
    email: string;

    @HasMany(() => Address)
    addresses: Address[];

    @HasMany(() => Order)
    orders: Order[];

}
