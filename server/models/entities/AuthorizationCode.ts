import {Table, Column, Model, Default, PrimaryKey, IsUUID} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";

@Table
export class AuthorizationCode extends BaseModel<AuthorizationCode> {

    @Column
    code: string;

    @Column
    redirectURI: string;

    @Column
    clientId: string;

    @Column
    userId: string;

    @Column
    addressId: string;

    @Column
    serviceId: string;

    @Column
    deviceId: string;

    @Column
    deviceModelId: string;

    @Column
    orderId: string;

    @Column
    settingId: string;
}
