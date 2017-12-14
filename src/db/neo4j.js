const neo4j = require('neo4j-driver').v1;
const config = require('../../config/config.json');
const driver = neo4j.driver('bolt://hobby-gckbeblfobflgbkebenigjal.dbs.graphenedb.com:24786', neo4j.auth.basic(config.neo4j.username, config.neo4j.password));
const session = driver.session();

const Player = require('../model/player');
const Academy = require('../model/academy');

let academy = new Academy({
    name: 'Academy'
});
let player = new Player({
    name: 'Player'
});

session
    .run("CREATE (player:Player{name: '" + player.name + "'})-[:ATTENDED]->(academy:Academy{name: '" + academy.name + "'})")
    .then(function (result) {
        session.close();
        res.send(result);
    });

module.exports = session;