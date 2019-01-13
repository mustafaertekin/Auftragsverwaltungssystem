# Express Typescript Seed
[Node.js](https://nodejs.org) with [Express 4](http://expressjs.com/4x) written in [Typescript](https://www.typescriptlang.org/)

[SQLite](https://www.sqlite.org) database under [Sequelize](http://docs.sequelizejs.com/) ORM

OAuth2 with [Passport](http://passportjs.org/)



Environment based configuration using [Dotenv](https://www.npmjs.com/package/dotenv)


## Quickstart
```
npm install 

# create 'seed' user with password 'password'
# create 'seed' database and set the 'seed' user as the owner
cp .env.example .env
npm start
# wait for app to start

npm run sqlz:seed
```

## Environment Setup
This project uses the [Dotenv](https://www.npmjs.com/package/dotenv) library to load sensitive data such
as database passwords and client secrets. 

There is a `.env.example` file included at the root of this project as an example, rename it to '.env' (.env is not under version control). Update the `.env` file with the pertinent information
for your project.


### Database
You will need a [Sqlite3] database running on localhost:5432 (or use the provided local-infra.yml in conjunction with docker-compose/swarm)


    
Since the tables defined in the entities do not already exist, Sequelize will attempt to build them once you start the server.

## Running the app
    npm install

    
### Running the tests
    npm run test

## Login 
    POST - http://localhost:3001/oauth/token
    Body => {
    "username":"admin@gmail.com",
    "password": "99032",
    "grant_type": "password"
    }


## License
MIT
