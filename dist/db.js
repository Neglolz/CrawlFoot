'use strict';

/**
 * Created by johnnyribeiro on 12/09/2017.
 */
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/players', {
    server: {
        auto_reconnect: true,
        socketOptions: {
            keepAlive: 120,
            connectTimeoutMS: 150000
        }
    }
});

mongoose.set('debug', true);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(new Date() + ' : connected to mongoDB');
});

module.exports = db;
//# sourceMappingURL=db.js.map