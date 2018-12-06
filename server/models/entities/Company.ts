import {AllowNull, Column, Table, Default, PrimaryKey, DataType,ForeignKey, IsUUID} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import { Address } from './Address';

@Table
export class Company extends BaseModel<Company> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    companyId: string;

    @AllowNull(false)
    @Column
    name: string;

    @ForeignKey(() => Address)
    @Column
    addressId: string;
}
