import {Column, DataType, Table, BelongsToMany, AllowNull, Default, ForeignKey, PrimaryKey, IsUUID} from 'sequelize-typescript';
import { BaseModel} from "./BaseModel";
import { OrderService } from './OrderService';
import { Order } from './Order';


@Table
export class Service extends BaseModel<Service> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    serviceId: string;

    @AllowNull(false)
    @Column
    serviceName: string;

    @Column
    price: number;

    @Column
    modelId: string;

    @BelongsToMany(() => Order, () => OrderService)
    orders: Order[];
}
