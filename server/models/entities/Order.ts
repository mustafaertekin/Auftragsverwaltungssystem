import {AllowNull, BeforeSave, Column, DataType, HasOne, ForeignKey, Table, Unique, BelongsToMany, Default, PrimaryKey, IsUUID} from 'sequelize-typescript';
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
    @AllowNull(false)
    @Column
    clientId: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    userId: string;

    @ForeignKey(() => Device)
    @AllowNull(false)
    @Column
    deviceId: string;

    @ForeignKey(() => DeviceModel)
    @AllowNull(false)
    @Column
    modelId: string;

    @BelongsToMany(() => Service, () => OrderService)
    service: Service[];

    @AllowNull(false)
    @Column
    price: string;

    @ForeignKey(() => Company)
    @AllowNull(false)
    @Column
    companyId: string;

    @Column(DataType.ENUM(OrderStatus.CANCELED, OrderStatus.CLOSED, OrderStatus.INPROGRESS, OrderStatus.OPENED, OrderStatus.READY, OrderStatus.WAITING))
    status: OrderStatus;

    @Column
    description: string;

}
