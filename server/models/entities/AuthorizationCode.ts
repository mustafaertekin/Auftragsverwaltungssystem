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
}
