# talk-plugin-publisher-auth

## Superdesk Publisher setup

## Coral Talk setup
- upload plugin to plugins folder
- add plugin to plugins.default.json
```
"server": [
    ...
    "talk-plugin-publisher-auth"
]
```
- setup .env variables
```
TALK_JWT_ISSUER=SUPERDESK_PUBLISHER
TALK_JWT_AUDIENCE=READER
TALK_JWT_ALG=RS256
TALK_JWT_SECRET={
    "public": "-----BEGIN PUBLIC KEY-----\\LINE1\\nLINE2\\nLINEX\\n-----END PUBLIC KEY-----\\n",
    "private": "-----BEGIN RSA PRIVATE KEY-----\\nLINE1\\nLINE2\\nLINEX\\n-----END RSA PRIVATE KEY-----\\n"
    }
TALK_PUBLISHER_API_URL=https://domain.com/api/v1/

```
note that `TALK_JWT_SECRET` certificates must have their newlines replaced with `\\n`

## Frontend setup
Push token into embed
```
Coral.Talk.render(document.getElementById('coralStreamEmbed'), {
    // ...
    auth_token: '<your generated JWT token issued for this user>',
});
```