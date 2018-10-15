import {
    Column, CreatedAt, Default, DeletedAt, IsUUID, Model, PrimaryKey, DataType, Table, AllowNull,
    UpdatedAt
} from 'sequelize-typescript';

@Table
export class BaseModel<T> extends Model<T> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(true)
    @Column
    @CreatedAt
    creationDate: Date;

    @AllowNull(true)
    @Column
    @UpdatedAt
    updatedOn: Date;

    @AllowNull(true)
    @Column
    @DeletedAt
    deletionDate: Date;
}
