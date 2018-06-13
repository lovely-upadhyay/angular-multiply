# angular-nodejs-mysql application

### Introduction
===
This is an Angular front end that will take in 2 numbers, a node.js restful service that will save the results to a DB and then retrieve the results the next time a page it loaded.Application provides nodejs restapi for getting inputs and saving the result in mysql database.

### Dev Setup

```sh
Install Node
```
```sh
Install mysql
```
```sh
Clone this repo using git clone git@github.com:lovely-upadhyay/angular-multiply.git 
```

### Build and start rest application

```sh
cd server
```
```sh
npm install
```
```sql
Import the database structure from database.sql to your database;
source database.sql
```
```sh
Update `database.json` credentials for mysql
```
```sh
  npm run start
```
```sh
rest api server will run @ port 8080, this will connect to mysql db
```

### Build and start client application

```sh
cd client
```
```sh
npm install
```
```sh
  npm run start
```
```sh
This should launch chrome browser @ port 8081. Internally, it uses http-server to start and serve the host app.
```