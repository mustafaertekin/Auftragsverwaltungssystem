import {Column, DataType, IsUUID, Default,PrimaryKey, ForeignKey, Table, BelongsToMany, HasMany} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import { Order } from './Order';
import { Service } from './Service';

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
    
    @ForeignKey(() => Service)
    @Column
    serviceId: string;
}