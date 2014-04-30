# Robin JavaScript SDK

A JavaScript SDK to communicate with the [Robin](http://getrobin.com/) platform.

This SDK provides the ability to communicate both with the Robin API and the Robin Grid.


### Robin API

The Robin API is a REST based API. Calls to the API return a `promise`.

API Routes with links to both source and tests:

| Route  | Source   | Test Cases  |
| ------ | -------- | ----------- |
| Accounts | [accounts.js](lib/api/modules/accounts.js) | |
| Apps | [apps.js](lib/api/modules/apps.js) | |
| Auth | [auth.js](lib/api/modules/auth.js) | |
| Channels | [channels.js](lib/api/modules/channels.js) | [testChannels.js](test/testChannels.js) |
| DeviceManifests | [devicemanifests.js](lib/api/modules/devicemanifests.js) | [testDeviceManifests.js](test/testDeviceManifests.js) |
| Devices | [devices.js](lib/api/modules/devices.js) | [testDevices.js](test/testDevices.js) |
| Identifiers | [identifiers.js](lib/api/modules/identifiers.js) | |
| Me | [me.js](lib/api/modules/me.js) | [testMe.js](test/testMe.js) |
| Organizations | [organizations.js](lib/api/modules/organizations.js) | [testOrganizations.js](test/testOrganizations.js) |
| Projects | [projects.js](lib/api/modules/projects.js) | |
| Triggers | [triggers.js](lib/api/modules/triggers.js) | |
| Users | [users.js](lib/api/modules/users.js) | |

### Robin Grid

The Grid is a websocket server that allows PubSub between clients and devices through configured channels. The Grid module is an `EventEmitter`, to allow real-time updates.

The Grid exposes several functions, these are:

* `join` - Allows clients to listen to updates from channels
* `leave` - Disconnects the client from receiving updates for a particular channel
* `send` - Allows a client to send messages to a channel.

## Development Roadmap

The following should be implemented:

* Support for use in browsers, as well as node.js
* Add winston for logging - will this work in browsers?
* Handle scope of access tokens for extended functionality (such as retrieving all API items)
* Adhere to Robin Javascript Coding Standards - this is TBD.
* Implement API function arguments based on API documentation
* Expand documentation to include all API modules
* Can we autogenerate API module functions based on a object template?

## Browserify

* `browserify -t brfs ./robin.js --standalone Robin > robin.browser.js`
* Have to figure out how to include directories, like `config/`