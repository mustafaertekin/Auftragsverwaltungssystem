import {AllowNull, Column, ForeignKey, DataType, BelongsTo, PrimaryKey, IsUUID, Default, Table, HasMany} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import {Device} from "./Device";
import {Service} from "./Service";

@Table
export class DeviceModel extends BaseModel<DeviceModel> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    deviceModelId: string;

    @ForeignKey(() => Device)
    @Column
    deviceId: string;

    @AllowNull(false)
    @Column
    deviceModelName: string;

}
