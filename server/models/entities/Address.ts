import {AllowNull, BeforeSave, Column, DataType, BelongsTo, ForeignKey, Table, Unique, HasMany, Default, PrimaryKey, IsUUID } from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import { Client } from './Client';
import { User } from './User';
import { Order } from './Order';


@Table
export class Address extends BaseModel<Address> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    addressId: string;

    @AllowNull(false)
    @Column
    streetName: string;

    @AllowNull(false)
    @Column
    plzNumber: string;

    @AllowNull(false)
    @Column
    cityName: string;

    @AllowNull(false)
    @Column
    countryName: string;

    @ForeignKey(() => Client)
    @Column
    clientId: string;

    @ForeignKey(() => User)
    @Column
    userId: string;

    @HasMany(() => Order)
    orders: Order[];

}
