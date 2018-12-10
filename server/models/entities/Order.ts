import {AllowNull, BeforeSave, Column, DataType, HasOne, ForeignKey, Table, Unique, BelongsToMany, Default, PrimaryKey, IsUUID, BelongsTo} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import { User } from './User';
import { Client } from './Client';
import { Device } from './Device';
import { Service } from './Service';
import { Company } from './Company';
import { OrderService } from './OrderService';
import { DeviceModel } from './DeviceModel';
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

    @AllowNull(false)
    @Column
    deliveryAddressId: string;

    @AllowNull(false)
    @Column
    billingAddressId: string;

    @ForeignKey(() => Company)
    @Column
    companyId: string;

    @Column(DataType.ENUM(OrderStatus.CANCELED, OrderStatus.CLOSED, OrderStatus.INPROGRESS, OrderStatus.OPENED, OrderStatus.READY, OrderStatus.WAITING))
    status: OrderStatus;

    @Column
    description: string;

    @BelongsTo(() => Client)
    client: Client;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Company)
    company: Company;
}

