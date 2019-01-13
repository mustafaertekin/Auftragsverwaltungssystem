# Auftragsverwaltungssystem

## HSR CAS-FEE2018 Projekt II

# DEMO
[Click here to visit demo page](http://104.248.32.52)

# Contributors 
- Ali Ogretmen 
- Mustafa Ertekin

# Express Typescript Seed
[Node.js](https://nodejs.org) with [Express 4](http://expressjs.com/4x) written in [Typescript](https://www.typescriptlang.org/)

[SQLite](https://www.sqlite.org) database under [Sequelize](http://docs.sequelizejs.com/) ORM

OAuth2 with [Passport](http://passportjs.org/)



Environment based configuration using [Dotenv](https://www.npmjs.com/package/dotenv)


## Quickstart
```
# cd into server
npm install 

mkdir logs
cp .env.example .env
npm start

# cd into client
npm install
npm start


```

## Login - infos  to get token for postman or etc..
    POST - http://localhost:3001/oauth/token
    Body => {
    "username":"admin@gmail.com",
    "password": "99032",
    "grant_type": "password"
    }


## License
MIT
