import {AllowNull, BeforeSave, Column, DataType, HasOne, IsEmail, Table, Unique, Default, PrimaryKey, IsUUID} from 'sequelize-typescript';
import {AccessToken} from "./AccessToken";
import {BaseModel} from "./BaseModel";
import {RoleEnum} from "../enums/RoleEnum";


@Table
export class User extends BaseModel<User> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    userId: string;

    @AllowNull(false)
    @Column
    firstName: string;

    @AllowNull(false)
    @Column
    lastName: string;

    @AllowNull(false)
    @IsEmail
    @Unique
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @Column(DataType.ENUM(RoleEnum.ADMIN, RoleEnum.MEMBER))
    role: RoleEnum;

    @AllowNull(false)
    @Column
    isActive: boolean;

    @HasOne(() => AccessToken)
    accessToken: AccessToken;

    @Column
    profilePicUrl: string;
    
   
}
