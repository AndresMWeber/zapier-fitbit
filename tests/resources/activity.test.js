/* globals describe it */
const should = require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Tests Activities', () => {
    it('should run resources.activity', done => {
        const bundle = { inputData: {} };

        appTester(App.resources.activity.list.operation.perform, bundle)
            .then(results => {
                should.exist(results);
                done();
            })
            .catch(done);
    });
});
