# Houses of Design Olympics (HoDO) Points Dashboard

This project is currently in development and full documentation will be released soon!

## Setup

### To seed the default houses and challenges

* Create a .env file in the root directory with the Mongo database URI included (See [env.template](env.template))
* Run `seed.js`

### To setup a user account

Still coming up with an easy way to do this. At the moment you must change line 42 of `/client/src/App.js` from `PrivateRoute` to `LoggedOutRoute`. This will make the signup page accessible without needing a login.

Additionally, you need to uncomment out lines 83-118 of `/server/routes/auth.js` to make the signup API route accessible.

## Routes

`PUT /api/points`

Adds or subtracts points from a single house.

**Requires authentication token from Passport sent in head of request.**

Example request body:
```
{
  'house': 'Hueristics',
  'points': 4
}
```

Example success response:
```
{
  'message': 'Success'
}
```

Example error response:
```
{
  'message': 'Error updating house points',
  'error': {}
}
```

`PUT /api/weekreset`

Resets the week points for all houses.

**Requires authentication token from Passport sent in head of request.**

```
No request body
```

Example success response:
```
{
  'message': 'Success'
}
```

Example error response:
```
{
  'message': 'Error reseting weekly house points',
  'error': {}
}
```

`PUT /api/giveowl`

Removes The Owl from all houses and then assigns The Owl to the specified house.

**Requires authentication token from Passport sent in head of request.**

Example request body:
```
{
  'house': 'Gestalt'
}
```

Example success response:
```
{
  'message': 'Success'
}
```

Example error response:
```
{
  'message': 'Error removing owl from all houses',
  'error': {}
}
```

`GET /public/points`

Retrieves an array of house objects

**Does not require any authentication.**

Example response:
```
[
  {
    'house': 'Gestalt',
    'head': 'Dishanta',
    'points': 0,
    'weekpoints': 0,
    'owl': false,
    'image': 'gestalt.png'
  }
]
```

`GET /public/challenges`

Retrieves an array of challenge objects.

**Does not require any authentication.**

Example response:
```
[
  {
    'title': 'Go to the design museum',
    'points': 6,
    'plus': true,
    'details': [
      'Cannot be earned more than once per month.'
    ]
  }
]
```

hannahap.com