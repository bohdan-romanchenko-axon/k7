![k7 Logo](images/k7.png)

[**hapi**](https://github.com/hapijs/hapi) database connector

[![Build Status](https://secure.travis-ci.org/thebergamo/k7.svg)](http://travis-ci.org/hapijs/good)![Current Version](https://img.shields.io/npm/v/k7.svg)

Lead Maintainer: [Marcos Bérgamo](https://github.com/thebergamo)

K7 is the simplest way to connect Hapi.js with your favorite Database Mapper, you can use any of ours available connectors for the most populars Databases.

## Example Usage

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

This example does the following:  
1. Setting the k7-mongoose adapter  
2. Setting the connectionString for mongoose connect  
3. Register the k7 to Hapi.js  

## Adapters
* [k7-bookshelf][k7-bookshelf] (WIP)
* [k7-mongoose][k7-mongoose]
* [k7-sequelize][k7-sequelize]

## API

See the [API Reference](API.md).


[k7-mongoose]: https://github.com/thebergamo/k7-mongoose
[k7-sequelize]: https://github.com/thebergamo/k7-sequelize
[k7-bookshelf]: https://github.com/thebergamo/k7-bookshelf

