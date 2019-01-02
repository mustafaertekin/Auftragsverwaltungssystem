import {AllowNull, Column, Table, ForeignKey, DataType, Default, PrimaryKey, IsUUID} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import { User } from './User';

@Table
export class Setting extends BaseModel<Setting> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    settingId: string;

    @AllowNull(true)
    @Column
    language: string;

    @AllowNull(true)
    @Column
    theme: string;

    @ForeignKey(() => User)
    @Column
    userId: string;
}
