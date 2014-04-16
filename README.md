# Robin JavaScript SDK

A JavaScript SDK to communicate with the [Robin](http://getrobin.com/) platform.

This SDK provides the ability to communicate both with the Robin API and the Robin Grid.

### Robin API

API Routes with links to both source and tests:

| Route  | Source   | Test Cases  |
| ------ | -------- | ----------- |
| Accounts | | |
| Apps | | |
| Auth | | |
| Channels | [channels.js](lib/api/channels.js) | [testChannels](test/testChannels.js) |
| DeviceManifests | [devicemanifests.js](lib/api/devicemanifests.js) | [testDeviceManifests](test/testDeviceManifests.js) |
| Devices | [devices.js](lib/api/devices.js) | [testDevices](test/testDevices.js) |
| Identifiers | | |
| Me | [me.js](lib/api/me.js) | [testMe](test/testMe.js) |
| Organizations | [organizations.js](lib/api/organizations.js) | [testOrganizations](test/testOrganizations.js) |
| Projects | | |
| Triggers | | |
| Users | [users.js](lib/api/users.js) | |

### Robin Grid

The Grid is a websocket server that allows PubSub between clients and devices through configured channels.