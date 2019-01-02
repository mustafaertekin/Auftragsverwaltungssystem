import {Op} from "sequelize";
import * as express from "express";
import {User} from "../models/entities/User";
import {Address} from "../models/entities/Address";
import {Setting} from "../models/entities/Setting";
import {NotFoundError} from "../errors/NotFoundError";
import {RoleEnum} from "../models/enums/RoleEnum";
import {Auth} from "../auth/auth";
import {AuthError} from "../errors/AuthError";
import {S3Manager} from "./S3Manager";
import {logger} from "../lib/logger";
import {Utils} from "../utils";
import * as _ from 'lodash';

export class UserManager {

    constructor() {

    }

    public async createUser(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        role: RoleEnum,
        isActive: boolean,
        profilePicUrl?: string
      ) {

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: Utils.encryptPassword(password),
            profilePicUrl,
            role,
            isActive
        });
        return newUser.save();
    }

    public async updateUser(userId: string, email: string, firstName: string,
      lastName: string, role: RoleEnum, isActive: boolean, profilePicUrl?: string): Promise<User> {

        const user = await User.find<User>({where: {userId: userId}});
        if (user) {
            user.email = email || user.email;
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.profilePicUrl = profilePicUrl || user.profilePicUrl;
            user.role = role;
            user.isActive = isActive;
            return user.save();
        } else {
            logger.error("No user found");
            throw new NotFoundError("No user found");
        }
    }

    public async updateProfileImage(userId: string, image: Express.Multer.File): Promise<User> {

        const s3Manager = new S3Manager();
        const user = await User.find<User>({where: {id: userId}});
        if (user) {
            s3Manager.uploadImage(image, 'profileImages', userId);
            user.profilePicUrl = `${process.env.S3_PROFILE_PIC_URL}/${userId}`;
            return user.save();
        } else {
            logger.error("No user found");
            throw new NotFoundError("No user found");
        }
    }

    public async findByEmail(email: string) {
        const user = await User.findOne<User>({where: {email: email}});
        if (user) {
            return user;
        } else {
            logger.error("No user found with the provided email");
            throw new NotFoundError("No user found with the provided email");
        }
    }

    public async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
      const userId = (_.get(req, 'params.userId') === 'current' || !_.get(req, 'params.userId'))
                 ? _.get(req, 'user.dataValues.userId') : _.get(req, 'params.userId');
      const user = await User.findOne<User>(
        {
          where: {
            userId: userId
          },
          include: [Setting]
        });
        if (user) {
            return user;
        } else {
            logger.error("No user found with the provided userId");
            throw new NotFoundError("No user found with the provided userId");
        }
    }

    public async findById(userId: string) {
        const user = await User.findOne<User>({where: {userId}, include: [Setting]});
        if (user) {
            return user;
        } else {
            logger.error("No user found with the provided email");
            throw new NotFoundError("No user found with the provided email");
        }
    }

    public async deleteUser(userId: string): Promise<User | null> {
        const user = await User.find<User>({where: {userId}});
        if (user) {
            await user.destroy();
            return user;
        } else {
            logger.error("No user found");
            throw new NotFoundError("No user found");
        }
    }

    public async search(req: express.Request, res: express.Response, next: express.NextFunction) {
      try{
        const result = await User.findAll({
          where: {
            [Op.or] : {
              '$User.userId$': { [Op.like]: `%${req.params.text}%`},
              '$User.firstName$': { [Op.like]: `%${req.params.text}%`},
              '$User.lastName$': { [Op.like]: `%${req.params.text}%`},
              '$User.role$': { [Op.like]: `%${req.params.text}%`},
              '$User.email$': { [Op.like]: `%${req.params.text}%`},
              '$addresses.streetName$': { [Op.like]: `%${req.params.text}%`},
              '$addresses.plzNumber$': { [Op.like]: `%${req.params.text}%`},
              '$addresses.cityName$': { [Op.like]: `%${req.params.text}%`},
              '$addresses.countryName$': { [Op.like]: `%${req.params.text}%`}
            }
          },
          include: [Address]
        });
        return result;
      } catch(err) {
        next(err);
      }
    }


    public async updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<User> {
        const user = await User.find<User>({where: {userId}});
        if (user) {
            try{
                const authorized = await Auth.comparePasswords(currentPassword, user.password);
                if (authorized) {
                    user.password =  Utils.encryptPassword(newPassword);
                    return user.save();
                } else {
                    logger.error("Current password incorrect");
                    throw new AuthError("Current password incorrect");
                }
            }
            catch(err){
                throw new AuthError(err);
            }

        } else {
            logger.error("No user found");
            throw new NotFoundError("No user found");
        }
    }
}
