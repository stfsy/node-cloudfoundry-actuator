# express-cloudfoundry-actuator-middleware

[![Build Status](https://travis-ci.org/stfsy/express-cloudfoundry-actuator-middleware.svg)](https://travis-ci.org/stfsy/express-cloudfoundry-actuator-middleware)
[![Dependency Status](https://img.shields.io/david/stfsy/express-cloudfoundry-actuator-middleware.svg)](https://github.com/stfsy/express-cloudfoundry-actuator-middleware/blob/master/package.json)
[![DevDependency Status](https://img.shields.io/david/dev/stfsy/express-cloudfoundry-actuator-middleware.svg)](https://github.com/stfsy/express-cloudfoundry-actuator-middleware/blob/master/package.json)
[![Npm downloads](https://img.shields.io/npm/dm/express-cloudfoundry-actuator-middleware.svg)](https://www.npmjs.com/package/express-cloudfoundry-actuator-middleware)
[![Npm Version](https://img.shields.io/npm/v/express-cloudfoundry-actuator-middleware.svg)](https://www.npmjs.com/package/express-cloudfoundry-actuator-middleware)
[![Git tag](https://img.shields.io/github/tag/stfsy/express-cloudfoundry-actuator-middleware.svg)](https://github.com/stfsy/express-cloudfoundry-actuator-middleware/releases)
[![Github issues](https://img.shields.io/github/issues/stfsy/express-cloudfoundry-actuator-middleware.svg)](https://github.com/stfsy/express-cloudfoundry-actuator-middleware/issues)
[![License](https://img.shields.io/npm/l/express-cloudfoundry-actuator-middleware.svg)](https://github.com/stfsy/express-cloudfoundry-actuator-middleware/blob/master/LICENSE)

ExpressJS actuator middleware for NodeJS Cloud Foundry Applications.

Currently provides **health** and **info** endpoints for Cloud Foundry Apps Manager. These two and future Endpoints are restricted to users that 
- are currently logged into the Apps Manager and 
- have sufficient privileges to view sensitive information.

Use this middleware in conjunction with [Cloud Foundry Actuator CLI](https://github.com/stfsy/node-cloudfoundry-actuator-cli) to generate a build info file ahead of deployment time. This file is optional, but we can't show version infos without it. 

See [Express Cloud Foundry Actuator Middleware Example](https://github.com/stfsy/express-cloudfoundry-actuator-middleware-example) for an example application with full integration of [Cloud Foundry Actuator CLI](https://github.com/stfsy/node-cloudfoundry-actuator-cli) and [Express Cloud Foundry Actuator Middleware](https://github.com/stfsy/express-cloudfoundry-actuator-middleware).

## Installation

```
npm install express-cloudfoundry-actuator-middleware --save
```

## Example

```js
'use strict'

const express = require('express')
const app = express()

const actuator = require('express-cloudfoundry-actuator-middleware')

// ...

app.use(actuator())

// ...
```

## Screenshots

### App overview
![Cloud Foundry App overview with Health Check](readme_cf_app_overview.png)

### Settings with app short info
![Cloud Foundry App settings with short app info](readme_cf_app_settings.png)
### Settings with app info popup
![Cloud Foundry App settings with app info popup](readme_cf_app_info.png)

## License

This project is distributed under the MIT license.