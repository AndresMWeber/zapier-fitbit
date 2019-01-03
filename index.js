const authentication = require('./authentication');


const includeBearerToken = (request, z, bundle) => {
  if (bundle.authData.access_token) {
    request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
  }
  return request;
};


const activityListRequest = {
  url: 'https://api.fitbit.com/1/user/-/activities/list.json?beforeDate=today&sort=desc&limit=10&offset=0'
};

// We can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
    includeBearerToken
  ],

  afterResponse: [],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    new_activity: {
      key: 'new_activity', // uniquely identifies the trigger
      noun: 'Activity', // user-friendly word that is used to refer to the resource
      // `display` controls the presentation in the Zapier Editor
      display: {
        label: 'New Activity',
        description: 'Triggers when a new activity is added.'
      },
      // `operation` implements the API call used to fetch the data
      operation: {
        perform: activityListRequest
      }
    },
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
  }
};

// Finally, export the app.
module.exports = App;
