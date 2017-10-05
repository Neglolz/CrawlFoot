'use strict';

/**
 * Created by johnnyribeiro on 05/10/2017.
 */
/**
 * Created by johnnyribeiro on 12/09/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    commonName: String,
    firstName: String,
    headshotImgUrl: String,
    lastName: String,
    league: {
        abbrName: String,
        id: Number,
        imgUrl: String,
        name: String
    },
    nation: {
        imageUrls: {
            small: String,
            medium: String,
            large: String
        },
        abbrName: String,
        id: Number,
        imgUrl: String,
        name: String
    },
    club: {
        imageUrls: Object,
        abbrName: String,
        id: Number,
        imgUrl: String,
        name: String
    },
    headshot: {
        largeImgUrl: String,
        medImgUrl: String,
        smallImgUrl: String
    },
    specialImages: {
        largeTOTWImgUrl: String,
        medTOTWImgUrl: String
    },
    position: String,
    composure: 95,
    playStyle: String,
    playStyleId: String,
    height: Number,
    weight: Number,
    birthdate: String,
    age: Number,
    acceleration: Number,
    aggression: Number,
    agility: Number,
    balance: Number,
    ballcontrol: Number,
    foot: String,
    skillMoves: Number,
    crossing: Number,
    curve: Number,
    dribbling: Number,
    finishing: Number,
    freekickaccuracy: Number,
    gkdiving: Number,
    gkhandling: Number,
    gkkicking: Number,
    gkpositioning: Number,
    gkreflexes: Number,
    headingaccuracy: Number,
    interceptions: Number,
    jumping: Number,
    longpassing: Number,
    longshots: Number,
    marking: Number,
    penalties: Number,
    positioning: Number,
    potential: Number,
    reactions: Number,
    shortpassing: Number,
    shotpower: Number,
    slidingtackle: Number,
    sprintspeed: Number,
    standingtackle: Number,
    stamina: Number,
    strength: Number,
    vision: Number,
    volleys: Number,
    weakFoot: Number,
    traits: [Number],
    specialities: [Number],
    atkWorkRate: String,
    defWorkRate: String,
    playerType: String,
    attributes: [6],
    name: String,
    quality: String,
    color: String,
    isGK: String,
    positionFull: String,
    isSpecialType: String,
    contracts: String,
    fitness: String,
    rawAttributeChemistryBonus: String,
    isLoan: String,
    squadPosition: String,
    iconAttributes: String,
    itemType: String,
    discardValue: String,
    id: String,
    modelName: String,
    baseId: Number,
    rating: Number

});

module.exports = mongoose.model('player', PlayerSchema);
//# sourceMappingURL=playerFifa.js.map