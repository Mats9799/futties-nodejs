const assert = require('assert');
const Player = require('../src/model/player');

describe('Creating player records', () => {
    it('saves a player', (done) => {
        const newPlayer = new Player({
            name: 'Test'
        });

        newPlayer.save()
            .then(() => {
                assert(!newPlayer.isNew);
                done();
            });
    });
});

describe('Reads players from the database', () => {
    let testPlayer;

    beforeEach((done) => {
        testPlayer = new Player({
            name: 'Test'
        });
        testPlayer.save()
            .then(() => done());
    });

    it('find all players with a name', (done) => {
        Player.find({ name: 'Test' })
            .then((players) => {
                assert(players[0]._id.toString() === testPlayer._id.toString());
                done();
            });
    });

    it('find a player with a certain id', (done) => {
        Player.findOne({ _id: testPlayer._id })
            .then((player) => {
                assert(player.name === 'Test');
                done();
            });
    });
});

describe('Updating a player record', () => {
    var newName = 'Dummy';
    var testPlayer;

    beforeEach((done) => {
        testPlayer = new Player({ name: 'Test' });
        testPlayer.save()
            .then(() => done());
    });

    function assertName(name, operation, done) {
        operation
            .then(() => Player.find({}))
            .then((players) => {
                assert(players.length === 1);
                assert(players[0].name === name);
                done();
            });
    }

    it('instance type using set n\' save', (done) => {
        testPlayer.set('name', newName);
        assertName(newName, testPlayer.save(), done);
    });

    it('model instance can update', (done) => {
        assertName(newName, testPlayer.update({name: newName}), done);
    });

    it('model class can update', (done) => {
        assertName(newName, Player.update({name: 'Test'}, {name: newName}), done);
    });

    it('model class can update one record', (done) => {
        assertName(newName, Player.findOneAndUpdate({name: 'Test'}, {name: newName}), done);
    });

    it('model class can find a record by id and update', (done) => {
        assertName(newName, Player.findByIdAndUpdate(testPlayer._id, {name: newName}), done);
    });
});

describe('Deleting a user', () => {
    var name = 'Test';
    var testPlayer;

    beforeEach((done) => {
        testPlayer = new Player({ name: name });
        testPlayer.save()
            .then(() => done());
    });

    it ('model instance remove', (done) => {
        testPlayer.remove()
            .then(() => Player.findOne({name: name}))
            .then((player) => {
                assert(player === null);
                done();
            });
    });

    it ('class method remove', (done) => {
        Player.remove({name: name})
            .then(() => Player.findOne({name: name}))
            .then((player) => {
                assert(player === null);
                done();
            });
    });

    it ('class method findOneAndRemove', (done) => {
        Player.findOneAndRemove({name: name})
            .then(() => Player.findOne({name: name}))
            .then((player) => {
                assert(player === null);
                done();
            });
    });

    it ('class method findByIdAndRemove', (done) => {
        Player.findByIdAndRemove(testPlayer._id)
            .then(() => Player.findOne({name: name}))
            .then((player) => {
                assert(player === null);
                done();
            });
    });
});