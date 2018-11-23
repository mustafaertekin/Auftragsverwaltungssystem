import {AllowNull, Column, Table, Default, PrimaryKey, DataType, IsUUID} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";

@Table
export class Device extends BaseModel<Device> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    deviceId: string;

    @AllowNull(false)
    @Column
    deviceName: string;

}
