/**
 * Created by johnnyribeiro on 12/09/2017.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlayerSchema = new Schema({
    id: { type: String, required:true },
    lien: String,
    nomCommun: String,
    nom: String,
    prenom: String,
    nationalite: String,
    taille: String,
    poids: String,
    pied: String,
    dateNaissance: String,
    age: Number,
    poste: String,
    club:{
        id: Number,
        nom: String
    },
    stats: {
        technique: {
            controles: Number,
            dribbles: Number,
        },
        defense: {
            marquage: Number,
            tacles: Number,
        },
        mental: {
            potentiel: Number,
            reactivite: Number,
            placementOf: Number,
            interception: Number,
            vista: Number,
        },
        passes: {
            centre: Number,
            courte: Number,
            longue: Number,
        },
        physique: {
            acceleration: Number,
            endurance: Number,
            force: Number,
            equilibre: Number,
            vitesse: Number,
            agilite: Number,
            detente: Number,
        },
        tirs: {
            tete: Number,
            frappe: Number,
            finition: Number,
            tirsLointain: Number,
            effet: Number,
            cf: Number,
            penalty: Number,
            volee: Number,
        },
        gardien: {
            placement: Number,
            plongeon: Number,
            main: Number,
            pied: Number,
            reflexes: Number,
        },
    },



})

module.exports = mongoose.model('player', PlayerSchema)