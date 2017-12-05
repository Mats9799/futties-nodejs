const assert = require('assert');
const Club = require('../src/model/club');
const Player = require('../src/model/player');

describe('Creating club records', () => {
    let club, player;

    beforeEach((done) => {
        player = new Player({
            name: 'Player'
        });
        player.save()
            .then(() => {
                club = new Club({
                    name: 'Club',
                    players: [
                        player
                    ]
                });
                club.save()
                    .then(() => done());
            });
    });

    it('saves a club', (done) => {
        player.save()
            .then(() => {
                club.save()
                    .then(() => {
                        assert(!club.isNew);
                        done();
                    });
            });
    });
});

describe('Reads clubs from the database', () => {
    let club, player;

    beforeEach((done) => {
        player = new Player({
            name: 'Player'
        });
        player.save()
            .then(() => {
                club = new Club({
                    name: 'Club',
                    players: [
                        player
                    ]
                });
                club.save()
                    .then(() => done());
            });
    });

    it('find all clubs with a name', (done) => {
        Club.find({ name: 'Club' })
            .then((clubs) => {
                assert(clubs[0]._id.toString() === club._id.toString());
                done();
            });
    });

    it('find a club with a certain id', (done) => {
        Club.findOne({ _id: club._id })
            .then((club) => {
                assert(club.name === 'Club');
                done();
            });
    });

    it('find a club with a certain player', (done) => {
        const clubId = club._id;
        const playerId = player._id;

        Club.findOne({
            players: { $in: [
                playerId
            ]}
        }).then((club) => {
            assert(club._id.toString() === clubId.toString());
            done();
        });
    });

    it('find a club with at least 1 player', (done) => {
        const clubId = club._id;

        Club.findOne({ $where: '(this.players.length > 0)'})
            .then((club) => {
                assert(club._id.toString() === clubId.toString());
                done();
            });
    })
});

describe('Updating a player record', () => {
    let newName = 'Dummy';
    let club, player;

    beforeEach((done) => {
        player = new Player({
            name: 'Player'
        });
        player.save()
            .then(() => {
                club = new Club({
                    name: 'Club',
                    players: [
                        player
                    ]
                });
                club.save()
                    .then(() => done());
            });
    });

    function assertName(name, operation, done) {
        operation
            .then(() => Club.find({}))
            .then((clubs) => {
                assert(clubs.length === 1);
                assert(clubs[0].name === name);
                done();
            });
    }

    it('instance type using set n\' save', (done) => {
        club.set('name', newName);
        assertName(newName, club.save(), done);
    });

    it('model instance can update', (done) => {
        assertName(newName, club.update({name: newName}), done);
    });

    it('model class can update', (done) => {
        assertName(newName, Club.update({name: 'Club'}, {name: newName}), done);
    });

    it('model class can update one record', (done) => {
        assertName(newName, Club.findOneAndUpdate({name: 'Club'}, {name: newName}), done);
    });

    it('model class can find a record by id and update', (done) => {
        assertName(newName, Club.findByIdAndUpdate(club._id, {name: newName}), done);
    });
});

describe('Deleting a user', () => {
    let name = 'Club';
    let club, player;

    beforeEach((done) => {
        player = new Player({
            name: 'Player'
        });
        player.save()
            .then(() => {
                club = new Club({
                    name: name,
                    players: [
                        player
                    ]
                });
                club.save()
                    .then(() => done());
            });
    });

    it ('model instance remove', (done) => {
        club.remove()
            .then(() => Club.findOne({name: name}))
            .then((club) => {
                assert(club === null);
                done();
            });
    });

    it ('class method remove', (done) => {
        Club.remove({name: name})
            .then(() => Club.findOne({name: name}))
            .then((club) => {
                assert(club === null);
                done();
            });
    });

    it ('class method findOneAndRemove', (done) => {
        Club.findOneAndRemove({name: name})
            .then(() => Club.findOne({name: name}))
            .then((club) => {
                assert(club === null);
                done();
            });
    });

    it ('class method findByIdAndRemove', (done) => {
        Club.findByIdAndRemove(club._id)
            .then(() => Club.findOne({name: name}))
            .then((club) => {
                assert(club === null);
                done();
            });
    });
});