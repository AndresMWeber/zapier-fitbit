const id_secret_base = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64");
const token_endpoint = "/oauth2/token";
const auth_endpoint = "/oauth2/authorize";


const getAccessToken = (z, bundle) => {
  z.request(`${process.env.BASE_URL_API}${token_endpoint}`, {
    method: 'POST',
    body: {
      code: bundle.inputData.code,
      client_id: process.env.CLIENT_ID,
      redirect_uri: bundle.inputData.redirect_uri,
      grant_type: 'authorization_code',
      state: bundle.inputData.state
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${id_secret_base}`
    }
  }).then(response => {
    if (response.status !== 200) {
      throw new Error('Unable to fetch access token: ' + response.content);
    }
    const { access_token, refresh_token } = JSON.parse(response.content);
    return { access_token, refresh_token };
  }).catch(error => {
    throw new Error('Unable to fetch access token due to error: ', error)
  });
};

const refreshAccessToken = (z, bundle) => {
  /* Example Post:
    POST https://api.fitbit.com/oauth2/token
    Authorization: Basic {{YOUR AUTHORIZATION}}
    Content-Type: application/x-www-form-urlencoded

    grant_type=refresh_token&refresh_token={{YOUR REFRESH TOKEN}}
  */
  z.request(`${process.env.BASE_URL_API}${token_endpoint}`, {
    method: 'POST',
    body: {
      refresh_token: bundle.authData.refresh_token,
      grant_type: 'refresh_token'
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${id_secret_base}`
    }
  }).then(response => {
    // Needs to return `access_token`. If the refresh token stays constant, can skip it. If it changes, can
    // return it here to update the user's auth on Zapier.
    if (response.status !== 200) {
      throw new Error('Unable to fetch access token: ' + response.content);
    }
    const { access_token, refresh_token } = JSON.parse(response.content);
    return { access_token, refresh_token };
  }).catch(err => {
    console.log(err);
  })
};


const testAuth = (z /*, bundle*/) => {
  // Normally you want to make a request to an endpoint that is either specifically designed to test auth, or one that
  // every user will have access to, such as an account or profile endpoint like /me.
  z.request({
    method: 'GET',
    url: `${process.env.BASE_URL_API}/1/user/-/profile.json`,
  }).then((response) => {
    // This method can return any truthy value to indicate the credentials are valid.
    // Raise an error to show
    if (response.status !== 200) {
      throw new Error('Unable to fetch access token: ' + response.content);
    }
    return response.content;
  });
};


const url_authorization = {
  url: `${process.env.BASE_URL}${auth_endpoint}`,
  method: 'GET',
  params: {
    client_id: '{{process.env.CLIENT_ID}}',
    redirect_uri: '{{bundle.inputData.redirect_uri}}',
    state: '{{bundle.inputData.state}}',
    response_type: 'code',
    scope: 'activity heartrate location profile',
    expires_in: 604800
  }
}


module.exports = {
  type: 'oauth2',
  oauth2Config: {
    // Step 1 of the OAuth flow; specify where to send the user to authenticate with your API.
    // Zapier generates the state and redirect_uri, you are responsible for providing the rest.
    // Note: can also be a function that returns a string
    authorizeUrl: url_authorization,
    // Step 2 of the OAuth flow; Exchange a code for an access token.
    // This could also use the request shorthand.
    getAccessToken: getAccessToken,
    refreshAccessToken: refreshAccessToken,
    // If you want Zapier to automatically invoke `refreshAccessToken` on a 401 response, set to true
    autoRefresh: true
  },
  // The test method allows Zapier to verify that the access token is valid. We'll execute this
  // method after the OAuth flow is complete to ensure everything is setup properly.
  test: testAuth,
  // assuming "user" is a key returned from the test
  connectionLabel: '{{user}}'
};