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

    @AllowNull(false)
    @Column
    language: string;

    @ForeignKey(() => User)
    @Column
    userId: string;
}
