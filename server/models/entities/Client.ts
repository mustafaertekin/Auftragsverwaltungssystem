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

    
    @AllowNull(false)
    @Unique
    @Column
    clientEmail: string;

    @AllowNull(false)
    @Column
    clientSecret: string;

    @AllowNull(false)
    @Column
    clientName: string;

    @AllowNull(false)
    @Column
    clientTelefon: string;

    @ForeignKey(() => Order)
    @Column
    orderId: string;

    @ForeignKey(() => Address)
    @Column
    addressId: string;

    @HasMany(() => Order)
    order: Order[];

}
