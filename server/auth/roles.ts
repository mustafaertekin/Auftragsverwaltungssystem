import {AuthError} from "../errors/AuthError";
import {RoleEnum} from "../models/enums/RoleEnum";
import * as _ from 'lodash';

const ConnectRoles = require('connect-roles');

export class Roles {

    public static connectRoles;

    public static middleware() {
        return Roles.connectRoles.middleware();
    }

    public static is(role: RoleEnum) {
        return Roles.connectRoles.is(role.toString());
    }

    public static buildRoles() {

        Roles.connectRoles = new ConnectRoles({
            failureHandler: function (req, res, action) {
                const error = new AuthError('Access Denied - You don\'t have permission to: ' + action);
                res.status(403).json(error);
            },
            async: true
        });

        Roles.connectRoles.use('admin', function (req) {
            if (req.user.role === 'admin') {
                return true;
            }
        });

        Roles.connectRoles.use('everyone', function (req) {
            return true;
        });

    }

    private static isAdmin(user): boolean {
        return user.role === 'admin';
    }
}
