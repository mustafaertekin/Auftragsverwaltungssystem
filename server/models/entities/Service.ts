import {Column, DataType, Table, BelongsToMany, HasMany, Default, PrimaryKey, IsUUID} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import { OrderService } from './OrderService';
import { Order } from './Order';

@Table
export class Service extends BaseModel<Service> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    serviceId: string;
    
    @Column
    description: string;

    @BelongsToMany(() => Order, () => OrderService)
    orders: Order[];
}
