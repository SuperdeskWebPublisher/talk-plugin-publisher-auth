const UserModel = require('../../../models/user');
const fetch = require('node-fetch');

module.exports = { tokenUserNotFound: async ({jwt, token}) => {

  let headers = {
    Authorization: 'Bearer ' + token
  }

  let response = await fetch( process.env.TALK_JWT_PUBLISHER_ENDPOINT + jwt.sub, {method: 'GET', headers: headers});
  let profile  = await response.json();
  let user = await UserModel.findOneAndUpdate(
    {
      id: profile.email
    },
    {
      id: profile.email,
      username: profile.username,
      lowercaseUsername: profile.username.toLowerCase(),
      profiles: [
        {
          provider: 'local',
          id: profile.email
        },
      ],
      status: {
        username: {
          status: 'SET',
          history: [
            {
              status: 'SET',
            },
          ],
        },
      },
      metadata: {
        displayName: profile.username,
      },
    },
    {
      setDefaultsOnInsert: true,
      new: true,
      upsert: true,
    });

    return user;
  }
};