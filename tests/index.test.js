
const should = require('should');
const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

beforeEach((done) => {
  done();
})

describe('My App', () => {
  it('should get an access token', (done) => {
    const bundle = {};
    appTester(App.authentication.oauth2Config.getAccessToken, bundle)
      .then(results => {
        console.log('results', results)
        should(results.length).above(1);

        const firstResult = results[0];
        console.log('test result: ', firstResult)
        should(firstResult.name).eql('name 1');
        should(firstResult.directions).eql('directions 1');

        done();
      })
      .catch(err => {
        console.log(err);
      });
  });

});
