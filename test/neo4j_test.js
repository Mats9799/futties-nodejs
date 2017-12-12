const assert = require('assert');
const session = require('../src/db/neo4j');
const Academy = require('../src/model/academy');
const Player = require('../src/model/player');

describe('Creating academy nodes', () => {
    let academy, player;

    beforeEach((done) => {
        player = new Player({
            name: 'Player'
        });
        academy = new Academy({
            name: 'Academy',
            players: [
                player
            ]
        })
    });

    it('saves an academy', (done) => {
        console.log('a');
        session
            .run("CREATE (academy:Academy {name:{name}}) RETURN academy.name", {
                "name": academy.name
            })
            .then(function (result) {
                console.log(result.name);
                assert(result.name === academy.name);
                session.close();
                done();
            })
            .catch(function(error) {
                console.log(error);
            });
    });
});