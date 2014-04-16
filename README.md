# Robin JavaScript SDK

A JavaScript SDK to communicate with the [Robin](http://getrobin.com/) platform.

This SDK provides the ability to communicate both with the Robin API and the Robin Grid.

### Robin API

API Routes with links to both source and tests:

| Route  | Source   | Test Cases  |
| ------ | -------- | ----------- |
| Accounts | [accounts.js](lib/api/accounts.js) | |
| Apps | [apps.js](lib/api/apps.js) | |
| Auth | [auth.js](lib/api/auth.js) | |
| Channels | [channels.js](lib/api/channels.js) | [testChannels.js](test/testChannels.js) |
| DeviceManifests | [devicemanifests.js](lib/api/devicemanifests.js) | [testDeviceManifests.js](test/testDeviceManifests.js) |
| Devices | [devices.js](lib/api/devices.js) | [testDevices.js](test/testDevices.js) |
| Identifiers | [identifiers.js](lib/api/identifiers.js) | |
| Me | [me.js](lib/api/me.js) | [testMe.js](test/testMe.js) |
| Organizations | [organizations.js](lib/api/organizations.js) | [testOrganizations.js](test/testOrganizations.js) |
| Projects | [projects.js](lib/api/projects.js) | |
| Triggers | [triggers.js](lib/api/triggers.js) | |
| Users | [users.js](lib/api/users.js) | |

### Robin Grid

The Grid is a websocket server that allows PubSub between clients and devices through configured channels.