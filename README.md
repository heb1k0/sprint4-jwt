
# SPRINT 4.2 Node REST + DB + JWT IT-Academy

## Routes

POST /players: create a player
PUT /players: modifies the player's name
POST /players/{id}/games: a specific player makes a roll
DELETE /players/{id}/games: deletes the player's rolls
GET /players: returns the list of all players in the system with their success rate
GET /players/{id}/games: returns the list of games by a player.
GET /players/ranking: returns the success percentage of the set of all players.
GET /players/ranking/loser: returns the player with the lowest success percentage.
GET /players/ranking/winner: returns the player with the highest exit percentage

Translated with www.DeepL.com/Translator (free version)

## Technology

- [Nodejs](https://nodejs.org/en/) - adventurous I/O for the backend.
- [Express](https://expressjs.com/es/) - fast node.js network application framework [@tjholowaychuk].
- [MYSQL](https://www.mysql.com/) - Database 
- [Sequelize](https://sequelize.org/) - Mysql ORM

## Installation

The project requires [Node.js](https://nodejs.org/), and mysql to work.

Install the dependencies and devDependencies and fix the server.
Create an .env file in the root directory with the following code and fill in the configuration fields


```sh
clone https://github.com/heb1k0/sprint4-jwt
cd sprint4-jwt
npm i
```

## Start

Do you want to start the project?

Create an .env file in the root directory with the following code and fill out the configuration fields

````sh
PORT=3000

MYSQL_PORT=PORT_DB
MYSQL_HOST=localhost
MYSQL_USERNAME=USER_DB
MYSQL_PASSWORD=PASSWORD_DB
``````

RUN MYSQL AND RUN NODEJS

````sh
npm run start

## POSTMAN FILE
- [JSON POSTMAN](https://github.com/heb1k0/sprint4-jwt/blob/main/Sprint4-jwt.postman_collection/) 