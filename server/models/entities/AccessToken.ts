import {BelongsTo, Column, DataType, ForeignKey, Table, PrimaryKey, Default, IsUUID} from 'sequelize-typescript';
import {BaseModel} from "./BaseModel";
import {User} from "./User";

@Table
export class AccessToken extends BaseModel<AccessToken> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    accessid: string;

    @Column(DataType.TEXT)
    token: string;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId: string;

    @Column
    clientId: string;
}
