import {AllowNull, Column, ForeignKey, DataType, PrimaryKey, IsUUID, Default, Table} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import {Device} from "./Device";

@Table
export class DeviceModel extends BaseModel<DeviceModel> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    deviceModelId: string;

    @ForeignKey(() => Device)
    @AllowNull(false)
    @Column
    deviceId: string;

    @AllowNull(false)
    @Column
    deviceModelName: string;

}
