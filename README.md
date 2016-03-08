![k7 Logo](images/k7.png)

[**hapi**](https://github.com/hapijs/hapi) database connector

[![Build Status](https://travis-ci.org/thebergamo/k7.svg)](https://travis-ci.org/thebergamo/k7)
[![Coverage Status](https://coveralls.io/repos/thebergamo/k7/badge.svg?branch=master&service=github)](https://coveralls.io/github/thebergamo/k7?branch=master)
[![Dependencies Status](https://david-dm.org/thebergamo/k7.svg)](https://david-dm.org/thebergamo/k7)
[![DevDependencies Status](https://david-dm.org/thebergamo/k7/dev-status.svg)](https://david-dm.org/thebergamo/k7#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/npm/k7/badge.svg)](https://snyk.io/test/npm/k7)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)


K7 is the simplest way to connect Hapi.js with your favorite Database Mapper, you can use any of ours available connectors for the most populars Databases.

## Example Usage

For example: 

```javascript
const Hapi = require('hapi');
const Server = new Hapi.Server();

Server.connection({host: 'localhost'});

let options = {
    adapter: require('k7-mongoose'),
    connectionString: 'mongodb://localhost:27017/K7Mongoose'
};

Server.register({
    register: require('k7'),
    options: options
}, (err) => {
    if (err) {
        throw err;
    }
    
    Server.start((err) => {
        if (err) {
            throw err;
        }
        
        Server.log('info', 'Server running at: ' + Server.info.uri);
    });
});
```

This example does: 
1. Setting the k7-mongoose adapter
2. Setting the connectionString for mongoose connect
3. Register the k7 to Hapi.js

## Adapters
* [k7-bookshelf][k7-bookshelf] (WIP)
* [k7-mongoose][k7-mongoose]
* [k7-sequelize][k7-sequelize]

## Write your own adapter
The K7 API is very simple, your adapter just need be a Class and export a function `load` and return an Object with all models and the Database Mapper instance for k7 decorate the database in Hapi.js.
For more examples, please see the source code in the [k7-sequelize][k7-sequelize] plugin.

## Testing
For testing you just need clone this repo and run `npm install && npm test` inside root folder of this project.; 


[k7-mongoose]: https://github.com/thebergamo/k7-mongoose
[k7-sequelize]: https://github.com/thebergamo/k7-sequelize
[k7-bookshelf]: https://github.com/thebergamo/k7-bookshelf
