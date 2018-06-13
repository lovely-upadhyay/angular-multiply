# angular-nodejs-mysql application

### Introduction
This is an Angular front end that will take in 2 numbers, a node.js restful service that will save the results to a DB and then retrieve the results the next time a page it loaded.Application provides nodejs restapi for getting inputs and saving the result in mysql database.

## Dev Setup

* Install Node
* Install mysql
* Clone this repo using git clone: git@github.com:lovely-upadhyayangular-multiply.git

### Build and start rest application

* cd server
* npm install
* Import the database structure from database.sql to your database;
source database.sql
* Update `database.json` credentials for mysql
* npm run start
* rest api server will run @ port 8080, this will connect to mysql db

### Build and start client application

* cd client
* npm install
* npm run start 
* This should launch chrome browser @ port 8081. Internally, it uses http-server to start and serve the host app.