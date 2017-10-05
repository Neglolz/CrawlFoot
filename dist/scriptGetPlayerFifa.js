'use strict';

/**
 * Created by johnnyribeiro on 05/10/2017.
 */
var player = require('./models/player');
var db = require('./db.js');
var mongoose = require('mongoose');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

for (var numPage = 1; numPage <= 564; numPage++) {
    var makeAjaxCall = function makeAjaxCall(url, methodType) {
        var xhr = new XMLHttpRequest();
        xhr.open(methodType, url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("xhr done successfully");
                    var resp = xhr.responseText;
                    var respJson = JSON.parse(resp);

                    //boucle sur chaque items de la 'page' de joueur
                    for (var nbPlayerPage = 0; nbPlayerPage < respJson.items.length; nbPlayerPage++) {
                        //console.log(respJson.items[nbPlayerPage].firstName)
                        //console.log(nbPlayerPage)

                        var p = respJson.items[nbPlayerPage];
                        // création de l'objet à enregistrer en base
                        var _idPlayer = p.id;
                        var _lien = p.link;
                        var _nomCommun = p.commonName;
                        var _nom = p.lastName;
                        var _prenom = p.firstName;
                        var _nationalite = p.nation.name;
                        var _taille = p.height;
                        var _poids = p.weight;
                        var _Pied = p.foot;
                        var _dateNaissance = p.birthdate;
                        var _age = p.age;
                        var _poste = p.position;

                        var _club = {
                            id: p.club.id,
                            nom: p.club.name
                        };
                        var _stats = {
                            technique: {
                                controles: p.ballcontrol,
                                dribbles: p.dribbling
                            },
                            defense: {
                                marquage: p.marking,
                                tacles: p.slidingtackle
                            },
                            mental: {
                                potentiel: p.potential,
                                reactivite: p.reactions,
                                placementOf: p.positioning,
                                interception: p.interceptions,
                                vista: p.vision
                            },
                            passes: {
                                centre: p.crossing,
                                courte: p.shortpassing,
                                longue: p.longpassing
                            },
                            physique: {
                                acceleration: p.acceleration,
                                endurance: p.stamina,
                                force: p.strength,
                                equilibre: p.balance,
                                vitesse: p.sprintspeed,
                                agilite: p.agility,
                                detente: p.jumping
                            },
                            tirs: {
                                tete: p.headingaccuracy,
                                frappe: p.shotpower,
                                finition: p.finishing,
                                tirsLointain: p.longshots,
                                effet: p.curve,
                                cf: p.freekickaccuracy,
                                penalty: p.penalties,
                                volee: p.volleys
                            },
                            gardien: {
                                placement: p.gkpositioning,
                                plongeon: p.gkdiving,
                                main: p.gkhandling,
                                pied: p.gkkicking,
                                reflexes: p.gkreflexes
                            }
                        };

                        ////////////////////////////////////////////////////////////////////////////////////////
                        var Player = new player({
                            id: _idPlayer,
                            lien: _lien,
                            nomCommun: _nomCommun,
                            nom: _nom,
                            prenom: _prenom,
                            nationalite: _nationalite,
                            taille: _taille,
                            poids: _poids,
                            Pied: _Pied,
                            dateNaissance: _dateNaissance,
                            age: _age,
                            poste: _poste,
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
                                    potentiel: _stats.mental.potentiel,
                                    reactivite: _stats.mental.reactivite,
                                    placementOf: _stats.mental.placementOf,
                                    interception: _stats.mental.interception,
                                    vista: _stats.mental.vista
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
                        try {
                            Player.save();
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                } else {
                    console.log("xhr failed");
                }
            } else {
                console.log("xhr processing going on");
            }
        };
        console.log("request sent succesfully");
    };

    var URL = "https://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=%7B%22page%22:" + numPage + ",%22quality%22:%22bronze,silver,gold,rare_bronze,rare_silver,rare_gold%22,%22position%22:%22LF,CF,RF,ST,LW,LM,CAM,CDM,CM,RM,RW,LWB,LB,CB,RB,RWB%22%7D";
    makeAjaxCall(URL, "GET");
}
console.log('OVER');
//# sourceMappingURL=scriptGetPlayerFifa.js.map