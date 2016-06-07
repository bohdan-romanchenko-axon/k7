# API Reference
- [Options](#options)
- [Adapters Interface](#adapters-interface)
  * [Adapter Lifecycle](#adapter-lifecycle)
    
**k7** is a simple database loader, using the power of the most common used data mappers to put your database inside a Hapi's server instance.

**k7** also have minimal options, and the major options are specified in ours **Adapters**. 
## Options

- `adapter` - required string or module for load the adapter.
- `[connectionString]` - optional string, specify a connectionString to connect to your database.
- `[connectionOptions]`: optional configuration object, specify the options passed for the connector. 
- `[models]`: optional string or array where you specify how **k7** can find your models. Valid values can be a glob pattern like `**/models.js`, or a string or array of the path for files. Defaults is `models/*.js`.

## Adapters Interface
The **k7** API is very simple, your adapter just need be a Class and export a function `load` and return an Object with all models and the Database Mapper instance to **k7** decorate the database in Hapi.js.

Your exported object in `load` function needs to be like this:

```javascript
{
    sequelize, // instance of Sequelize
    Sequelize, // Sequelize's class
    User // User's model of Sequelize
}
```

For more information, you can see the source code in the [k7-sequelize][k7-sequelize] plugin.

### Adapter Lifecycle
When you require **k7** and set the options correctly, the adapter will calling the `load` function on the specified adapter. 

After the adapter complete the load process, your models will be available in `server.database` all of your databases will be there. `server.database` have the instance of the Database Mapper used too.

If your model are in a file called `models/user.js`, the model will be avaiblable as `server.database.User`.

[k7-sequelize]: https://github.com/thebergamo/k7-sequelize

