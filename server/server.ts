import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as config from "./config/config";
import * as http from "http";
import * as cors  from 'cors';
import * as fs from "fs";
import * as path from "path";
import {Auth} from "./auth/auth";
import {Models} from "./models";
import {Router} from "./routes/index";
import {errorHandler} from "./errors/ErrorHandler";
import {Roles} from "./auth/roles";
import {MessageManager} from "./managers/MessageManager";
import {InternalServerError} from "./errors/InternalServerError";
import {logger} from "./lib/logger";
import morgan = require("morgan");
import {UserManager} from "./managers/UserManager";
import {RoleEnum} from "./models/enums/RoleEnum";
import * as _ from 'lodash';

// const amqplib = require('amqplib');

export class Server {

    public static app: express.Express;

    // TODO Make all of this async
    constructor() {}

    public static async initializeApp(): Promise<http.Server> {
        try {
            require('dotenv').config();

            Server.app = express();

            Server.app.set('view engine', 'pug');
            // Configure application
            Server.configureApp();

            // Initialize OAuth
            Server.initializeAuth();

            // Initialize role based security
            Server.initializeRoles();

            // Initialize Routes
            Router.initializeRoutes(Server.app);

            // Initialize RabbitMQ Connection
            // amqplib.connect('amqp://localhost').then(connection => {
            //     MessageManager.connection = connection;
            // }, () => {
            //     logger.error("Could not initialize RabbitMQ Server");
            //     throw new InternalServerError("Cannot connect to RabbitMQ Server");
            // });

            Server.app.use(errorHandler);

            process.on('unhandledRejection', (reason, p) => {
                logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
            });

            // Initialize Database then bootstrap application
            try {
                await Server.initializeDatabase();
                logger.debug("[STARTED] Database open for business!..");
            } catch(error) {
                logger.error("Failed to initialize database", error);
            }

            return Server.app.listen(Server.app.get("port"));

        } catch(error) {
            throw new InternalServerError(error.message);
        }

    }

    private static initializeDatabase() {
        const nodeEnv = process.env.NODE_ENV;
        if(nodeEnv) {
            const sequelizeConfig = config[nodeEnv];
            const models = new Models(sequelizeConfig);
            return models.initModels();
        } else {
            throw new InternalServerError("No NODE ENV set");
        }
    }

    private static initializeAuth() {
        Server.app.use(passport.initialize());
        Auth.serializeUser();
        Auth.useBasicStrategy();
        Auth.useBearerStrategy();
        Auth.useLocalStrategy();
    }

    private static initializeRoles() {
        Roles.buildRoles();
        Server.app.use(Roles.middleware());
    }

    private static configureApp() {
        Server.app.set("port", process.env.PORT || 3001);
        Server.app.use(bodyParser.urlencoded({ extended: true }));
        Server.app.use(bodyParser.json());
        Server.app.use(compression());
        Server.app.use(cors());
        Server.app.use(morgan((tokens, req, res) => {
            return  [
                        _.get(req, 'user.firstName'),
                        _.get(req, 'user.lastName'),
                        tokens.method(req, res),
                        tokens.url(req, res),
                        tokens.status(req, res)
                    ].join(' ');
        }, {  "stream": logger.stream  }));
    }
}
