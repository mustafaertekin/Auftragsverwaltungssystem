import {Column, DataType, Table, BelongsToMany, Scopes,
  AllowNull,ForeignKey, Default, BelongsTo, PrimaryKey, IsUUID, HasOne} from 'sequelize-typescript';
import { BaseModel} from "./BaseModel";
import { OrderService } from './OrderService';
import { Order } from './Order';
import { DeviceModel } from './DeviceModel';

@Scopes({
  full: {
    include: [() => DeviceModel]
  }
})
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

    @ForeignKey(() => DeviceModel)
    @Column
    modelId: string;

    @BelongsToMany(() => Order, () => OrderService)
    orders: Order[];

    @BelongsTo(() => DeviceModel)
    deviceModel: DeviceModel;
}
