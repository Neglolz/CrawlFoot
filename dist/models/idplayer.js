'use strict';

/**
 * Created by johnnyribeiro on 12/09/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    id: 'String',
    link: 'String',
    name: 'String',
    surname: 'String',
    nationality: 'String',
    stats: {}

});

module.exports = mongoose.model('player', PlayerSchema);
//# sourceMappingURL=idplayer.js.map