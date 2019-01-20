import {AllowNull, BeforeSave, Column, DataType, HasOne, ForeignKey, Table, Unique, BelongsToMany, Default, PrimaryKey, IsUUID, BelongsTo, HasMany} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import { User } from './User';
import { Client } from './Client';
import { Device } from './Device';
import { Service } from './Service';
import { Company } from './Company';
import { OrderService } from './OrderService';
import { Address } from './Address';
import { OrderStatus } from '../enums/OrderStatus';


@Table
export class Order extends BaseModel<Order> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    orderId: string;

    @ForeignKey(() => Client)
    @Column
    clientId: string;

    @ForeignKey(() => User)
    @Column
    userId: string;

    @BelongsToMany(() => Service, () => OrderService)
    services: Service[];

    @AllowNull(false)
    @Column
    price: string;

    @AllowNull(false)
    @Column
    deliveryDate: string;


    @ForeignKey(() => Address)
    @Column
    deliveryAddressId: string;

    @ForeignKey(() => Address)
    @Column
    billingAddressId: string;

    // this gets only one address needs to be solved
    // or make another request and show addreses on a different view
    @BelongsTo(() => Address)
    address: Address;

    @ForeignKey(() => Company)
    @Column
    companyId: string;

    @Column(DataType.ENUM(OrderStatus.CANCELLED, OrderStatus.CLOSED, OrderStatus.INPROGRESS, OrderStatus.OPENED, OrderStatus.READY))
    status: OrderStatus;

    @Column
    description: string;

    @BelongsTo(() => Client)
    client: Client;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Company)
    company: Company;

    @HasMany(() => OrderService)
    orderServices: OrderService[];

}

