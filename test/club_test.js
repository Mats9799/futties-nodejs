const assert = require('assert');
const Club = require('../src/club');

describe('Creating club records', () => {
    it('saves a club', (done) => {
        const newClub = new Club({
            name: 'Test'
        });

        newClub.save()
            .then(() => {
                assert(!newClub.isNew);
                done();
            });
    });
});

describe('Reads clubs from the database', () => {
    let testClub;

    beforeEach((done) => {
        testClub = new Club({
            name: 'Test'
        });
        testClub.save()
            .then(() => done());
    });

    it('find all clubs with a name', (done) => {
        Club.find({ name: 'Test' })
            .then((clubs) => {
                assert(clubs[0]._id.toString() === testClub._id.toString());
                done();
            });
    });

    it('find a club with a certain id', (done) => {
        Club.findOne({ _id: testClub._id })
            .then((club) => {
                assert(club.name === 'Test');
                done();
            });
    });
});

describe('Updating a player record', () => {
    var newName = 'Dummy';
    var testClub;

    beforeEach((done) => {
        testClub = new Club({ name: 'Test' });
        testClub.save()
            .then(() => done());
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
        testClub.set('name', newName);
        assertName(newName, testClub.save(), done);
    });

    it('model instance can update', (done) => {
        assertName(newName, testClub.update({name: newName}), done);
    });

    it('model class can update', (done) => {
        assertName(newName, Club.update({name: 'Test'}, {name: newName}), done);
    });

    it('model class can update one record', (done) => {
        assertName(newName, Club.findOneAndUpdate({name: 'Test'}, {name: newName}), done);
    });

    it('model class can find a record by id and update', (done) => {
        assertName(newName, Club.findByIdAndUpdate(testClub._id, {name: newName}), done);
    });
});

describe('Deleting a user', () => {
    var name = 'Test';
    var testClub;

    beforeEach((done) => {
        testClub = new Club({name: name});
        testClub.save()
            .then(() => done());
    });

    it ('model instance remove', (done) => {
        testClub.remove()
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
        Club.findByIdAndRemove(testClub._id)
            .then(() => Club.findOne({name: name}))
            .then((club) => {
                assert(club === null);
                done();
            });
    });
});