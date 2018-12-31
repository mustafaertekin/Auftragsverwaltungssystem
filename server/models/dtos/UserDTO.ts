import {User} from "../entities/User";

export class UserDTO {
    public userId: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public profilePicUrl: string;
    public creationDate: Date;
    public isActive: boolean;
    public role: string;

    constructor(user: User) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.isActive = user.isActive;
        this.creationDate = user.creationDate;
        this.profilePicUrl = user.profilePicUrl;
        this.role = user.role;
    }
}
