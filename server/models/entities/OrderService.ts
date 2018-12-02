import {Column, DataType, IsUUID, Default,PrimaryKey, ForeignKey, Table, BelongsToMany, HasMany} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import { Order } from './Order';
import { Service } from './Service';
import { DeviceModel } from './DeviceModel';
import { Device } from './Device';

@Table
export class OrderService extends BaseModel<OrderService> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    orderServiceId: string;

    @ForeignKey(() => Order)
    @Column
    orderId: string;

    @ForeignKey(() => Device)
    @Column
    deviceId: string;

    @ForeignKey(() => DeviceModel)
    @Column
    modelId: string;

    @ForeignKey(() => Service)
    @Column
    serviceId: string;
}
