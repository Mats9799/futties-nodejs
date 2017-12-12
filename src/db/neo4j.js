const neo4j = require('neo4j-driver').v1;
const config = require('../../config/config.json');
const driver = neo4j.driver('bolt://hobby-gckbeblfobflgbkebenigjal.dbs.graphenedb.com:24786', neo4j.auth.basic(config.neo4j.username, config.neo4j.password));
const session = driver.session();

const Academy = require('../model/academy');

let academy = new Academy({
    name: 'Academy'
});

session
    .run("CREATE (academy:Academy {name:'" + academy.name + "'}) RETURN academy.name")
    .then(function (result) {
        console.log(result);
        session.close();
    });

module.exports = session;