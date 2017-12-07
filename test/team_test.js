const assert = require('assert');
const Player = require('../src/model/player');
const Team = require('../src/model/club');

describe('Creating team records', () => {
    let player, team;

    beforeEach((done) => {
        player = new Player({
            name: 'Player'
        });
        player.save()
            .then(() => {
                team = new Team({
                    name: 'Team',
                    players: [
                        player
                    ]
                });
                team.save()
                    .then(() => done());
            });
    });

    it('saves a team', (done) => {
        player.save()
            .then(() => {
                team.save()
                    .then(() => {
                        assert(!team.isNew);
                        done();
                    });
            });
    });
});

describe('Reads teams from the database', () => {
    let emptyTeam, player, team;

    beforeEach((done) => {
        player = new Player({
            name: 'Player'
        });
        player.save()
            .then(() => {
                team = new Team({
                    name: 'Team',
                    players: [
                        player
                    ]
                });
                team.save()
                    .then(() => {
                        emptyTeam = new Team({
                            name: 'Empty team',
                        });
                        emptyTeam.save().then(() => {
                            done();
                        });
                    });
            });
    });

    it('find all teams with a name', (done) => {
        Team.find({ name: 'Team' })
            .then((teams) => {
                assert(teams[0]._id.toString() === team._id.toString());
                done();
            });
    });

    it('find a team with a certain id', (done) => {
        Team.findOne({ _id: team._id })
            .then((team) => {
                assert(team.name === 'Team');
                done();
            });
    });

    it('find a team with a certain player', (done) => {
        const playerId = player._id;
        const teamId = team._id;

        Team.findOne({
            players: { $in: [
                playerId
            ]}
        }).then((team) => {
            assert(team._id.toString() === teamId.toString());
            done();
        });
    });

    it('find a team with at least 1 player', (done) => {
        const teamId = team._id;

        Team.findOne({ $where: 'this.players.length > 0'})
            .then((team) => {
                assert(team._id.toString() === teamId.toString());
                done();
            });
    });

    it('find a team with no players', (done) => {
        const teamId = emptyTeam._id;

        Team.findOne({ $where: 'this.players.length <= 0'})
            .then((team) => {
                assert(team._id.toString() === teamId.toString());
                done();
            });
    });
});

describe('Updating a team record', () => {
    let newName = 'Dummy';
    let player, team;

    beforeEach((done) => {
        player = new Player({
            name: 'Player'
        });
        player.save()
            .then(() => {
                team = new Team({
                    name: 'Team',
                    players: [
                        player
                    ]
                });
                team.save()
                    .then(() => done());
            });
    });

    function assertName(name, operation, done) {
        operation
            .then(() => Team.find({}))
            .then((teams) => {
                assert(teams.length === 1);
                assert(teams[0].name === name);
                done();
            });
    }

    it('instance type using set n\' save', (done) => {
        team.set('name', newName);
        assertName(newName, team.save(), done);
    });

    it('model instance can update', (done) => {
        assertName(newName, team.update({name: newName}), done);
    });

    it('model class can update', (done) => {
        assertName(newName, Team.update({name: 'Team'}, {name: newName}), done);
    });

    it('model class can update one record', (done) => {
        assertName(newName, Team.findOneAndUpdate({name: 'Team'}, {name: newName}), done);
    });

    it('model class can find a record by id and update', (done) => {
        assertName(newName, Team.findByIdAndUpdate(team._id, {name: newName}), done);
    });
});

describe('Deleting a team', () => {
    let name = 'Team';
    let player, team;

    beforeEach((done) => {
        player = new Player({
            name: 'Player'
        });
        player.save()
            .then(() => {
                team = new Team({
                    name: name,
                    players: [
                        player
                    ]
                });
                team.save()
                    .then(() => done());
            });
    });

    it ('model instance remove', (done) => {
        team.remove()
            .then(() => Team.findOne({name: name}))
            .then((team) => {
                assert(team === null);
                done();
            });
    });

    it ('class method remove', (done) => {
        Team.remove({name: name})
            .then(() => Team.findOne({name: name}))
            .then((team) => {
                assert(team === null);
                done();
            });
    });

    it ('class method findOneAndRemove', (done) => {
        Team.findOneAndRemove({name: name})
            .then(() => Team.findOne({name: name}))
            .then((team) => {
                assert(team === null);
                done();
            });
    });

    it ('class method findByIdAndRemove', (done) => {
        Team.findByIdAndRemove(team._id)
            .then(() => Team.findOne({name: name}))
            .then((team) => {
                assert(team === null);
                done();
            });
    });
});