const config = require('../config/config.json');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/futties-test');
    mongoose.connection
        .once('open', () => {
            done();
        })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

afterEach((done) => {
    mongoose.connection.collections['clubs'].drop(() => {
        mongoose.connection.collections['players'].drop(() => {
            //Ready to run the next test
            done();
        });
    });
});