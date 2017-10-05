'use strict';

/**
 * Created by johnnyribeiro on 17/09/2017.
 */
/**
 * Created by johnnyribeiro on 11/09/2017.
 */
var Crawler = require("crawler");
var db = require('./db.js');
var player = require('./models/player');

var c = new Crawler({
    maxConnections: 10,
    rateLimit: 1000,
    // This will be called for each crawled page
    callback: function callback(error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
        }
        done();
    }
});

c.queue([{
    uri: 'https://www.fifaindex.com/fr/player/167495/manuel-neuer/',
    jQuery: true,

    // The global callback won't be called
    callback: function callback(error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            console.log($("title").text());

            ////////////////////////////////////////////////////////////////////////////////////////

            var _idPlayer = '167495';
            var _lien = 'String';

            var nomCompletStr = $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div:nth-child(2) > div.col-lg-7.col-sm-6 > div > div.media-body.media-middle > h2.media-heading.big').text().split(" ");

            var _nom = nomCompletStr[1];
            var _prenom = nomCompletStr[0];
            var _nationalite = $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div:nth-child(2) > div.col-lg-7.col-sm-6 > div > div.media-body.media-middle > h2.subtitle > a').text();
            var _taille = $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div:nth-child(2) > div.col-lg-5.col-sm-6 > div > div.panel-body > p:nth-child(1) > span').text();
            var _poids = $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div:nth-child(2) > div.col-lg-5.col-sm-6 > div > div.panel-body > p:nth-child(2) > span').text();
            var _Pied = $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div:nth-child(2) > div.col-lg-5.col-sm-6 > div > div.panel-body > p:nth-child(3) > span').text();
            var _dateNaissance = $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div:nth-child(2) > div.col-lg-5.col-sm-6 > div > div.panel-body > p:nth-child(4) > span').text();
            var _age = $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div:nth-child(2) > div.col-lg-5.col-sm-6 > div > div.panel-body > p:nth-child(5) > span').text();
            var _poste = $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div:nth-child(2) > div.col-lg-5.col-sm-6 > div > div.panel-body > p:nth-child(6) > span > a > span').text();
            var _mentalite = $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div:nth-child(2) > div.col-lg-5.col-sm-6 > div > div.panel-body > p:nth-child(7) > span').text();

            var a = $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div:nth-child(3) > div:nth-child(2) > div > div.panel-heading > h3 > a:nth-child(2)').attr('href');

            var idClubStr = void 0;

            if (a === undefined) {
                var b = $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div:nth-child(3) > div > div > div.panel-heading > h3 > a:nth-child(2)').text();
                idClubStr = b.split("/");
            } else {
                idClubStr = a.split("/");
            }

            var _club = {
                id: idClubStr[3],
                nom: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div:nth-child(3) > div:nth-child(2) > div > div.panel-heading > h3 > a:nth-child(2)').text()
            };

            var _stats = {
                technique: {
                    controles: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(1) > div > div.panel-body > p:nth-child(1) > span > span').text(),
                    dribbles: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(1) > div > div.panel-body > p:nth-child(2) > span > span').text()
                },
                defense: {
                    marquage: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(2) > div > div.panel-body > p:nth-child(1) > span > span').text(),
                    tacles: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(2) > div > div.panel-body > p:nth-child(2) > span > span').text()
                },
                mental: {
                    engagement: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(3) > div > div.panel-body > p:nth-child(1) > span > span').text(),
                    reactivite: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(3) > div > div.panel-body > p:nth-child(2) > span > span').text(),
                    placementOf: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(3) > div > div.panel-body > p:nth-child(3) > span > span').text(),
                    interception: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(3) > div > div.panel-body > p:nth-child(4) > span > span').text(),
                    vista: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(3) > div > div.panel-body > p:nth-child(5) > span > span').text(),
                    discipline: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(3) > div > div.panel-body > p:nth-child(6) > span > span').text()
                },
                passes: {
                    centre: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(4) > div > div.panel-body > p:nth-child(1) > span > span').text(),
                    courte: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(4) > div > div.panel-body > p:nth-child(2) > span > span').text(),
                    longue: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(4) > div > div.panel-body > p:nth-child(3) > span > span').text()
                },
                physique: {
                    acceleration: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(6) > div > div.panel-body > p:nth-child(1) > span > span').text(),
                    endurance: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(6) > div > div.panel-body > p:nth-child(2) > span > span').text(),
                    force: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(6) > div > div.panel-body > p:nth-child(3) > span > span').text(),
                    equilibre: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(6) > div > div.panel-body > p:nth-child(4) > span > span').text(),
                    vitesse: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(6) > div > div.panel-body > p:nth-child(5) > span > span').text(),
                    agilite: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(6) > div > div.panel-body > p:nth-child(6) > span > span').text(),
                    detente: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(6) > div > div.panel-body > p:nth-child(7) > span > span').text()
                },
                tirs: {
                    tete: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(7) > div > div.panel-body > p:nth-child(1) > span > span').text(),
                    frappe: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(7) > div > div.panel-body > p:nth-child(2) > span > span').text(),
                    finition: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(7) > div > div.panel-body > p:nth-child(3) > span > span').text(),
                    tirsLointain: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(7) > div > div.panel-body > p:nth-child(4) > span > span').text(),
                    effet: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(7) > div > div.panel-body > p:nth-child(5) > span > span').text(),
                    cf: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(7) > div > div.panel-body > p:nth-child(6) > span > span').text(),
                    penalty: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(7) > div > div.panel-body > p:nth-child(7) > span > span').text(),
                    volee: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(7) > div > div.panel-body > p:nth-child(8) > span > span').text()
                },
                gardien: {
                    placement: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(8) > div > div.panel-body > p:nth-child(1) > span > span').text(),
                    plongeon: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(8) > div > div.panel-body > p:nth-child(2) > span > span').text(),
                    main: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(8) > div > div.panel-body > p:nth-child(3) > span > span').text(),
                    pied: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(8) > div > div.panel-body > p:nth-child(4) > span > span').text(),
                    reflexes: $('body > div.container.main > div:nth-child(3) > div.col-md-8 > div.row.grid > div:nth-child(8) > div > div.panel-body > p:nth-child(5) > span > span').text()
                }
            };

            ////////////////////////////////////////////////////////////////////////////////////////
            var Player = new player({
                id: _idPlayer,
                lien: _lien,
                nom: _nom,
                prenom: _prenom,
                nationalite: _nationalite,
                taille: _taille,
                poids: _poids,
                Pied: _Pied,
                dateNaissance: _dateNaissance,
                age: _age,
                poste: _poste,
                mentalite: _mentalite,
                club: {
                    id: _club.id,
                    nom: _club.nom
                },
                stats: {
                    technique: {
                        controles: _stats.technique.controles,
                        dribbles: _stats.technique.dribbles
                    },
                    defense: {
                        marquage: _stats.defense.marquage,
                        tacles: _stats.defense.tacles
                    },
                    mental: {
                        engagement: _stats.mental.engagement,
                        reactivite: _stats.mental.reactivite,
                        placementOf: _stats.mental.placementOf,
                        interception: _stats.mental.interception,
                        vista: _stats.mental.vista,
                        discipline: _stats.mental.discipline
                    },
                    passes: {
                        centre: _stats.passes.centre,
                        courte: _stats.passes.courte,
                        longue: _stats.passes.longue
                    },
                    physique: {
                        acceleration: _stats.physique.acceleration,
                        endurance: _stats.physique.endurance,
                        force: _stats.physique.force,
                        equilibre: _stats.physique.equilibre,
                        vitesse: _stats.physique.vitesse,
                        agilite: _stats.physique.agilite,
                        detente: _stats.physique.detente
                    },
                    tirs: {
                        tete: _stats.tirs.tete,
                        frappe: _stats.tirs.frappe,
                        finition: _stats.tirs.finition,
                        tirsLointain: _stats.tirs.tirsLointain,
                        effet: _stats.tirs.effet,
                        cf: _stats.tirs.cf,
                        penalty: _stats.tirs.penalty,
                        volee: _stats.tirs.volee
                    },
                    gardien: {
                        placement: _stats.gardien.placement,
                        plongeon: _stats.gardien.plongeon,
                        main: _stats.gardien.main,
                        pied: _stats.gardien.pied,
                        reflexes: _stats.gardien.reflexes
                    }
                }
            });

            Player.save();
        }
        done();
    }
}]);
//# sourceMappingURL=crawlplayer.js.map