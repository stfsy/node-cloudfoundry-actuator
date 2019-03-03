# node-cloudfoundry-actuator

[![Build Status](https://travis-ci.org/stfsy/node-cloudfoundry-actuator.svg)](https://travis-ci.org/stfsy/node-cloudfoundry-actuator)
[![Dependency Status](https://img.shields.io/david/stfsy/node-cloudfoundry-actuator.svg)](https://github.com/stfsy/node-cloudfoundry-actuator/blob/master/package.json)
[![DevDependency Status](https://img.shields.io/david/dev/stfsy/node-cloudfoundry-actuator.svg)](https://github.com/stfsy/node-cloudfoundry-actuator/blob/master/package.json)
[![Npm downloads](https://img.shields.io/npm/dm/node-cloudfoundry-actuator.svg)](https://www.npmjs.com/package/node-cloudfoundry-actuator)
[![Npm Version](https://img.shields.io/npm/v/node-cloudfoundry-actuator.svg)](https://www.npmjs.com/package/node-cloudfoundry-actuator)
[![Git tag](https://img.shields.io/github/tag/stfsy/node-cloudfoundry-actuator.svg)](https://github.com/stfsy/node-cloudfoundry-actuator/releases)
[![Github issues](https://img.shields.io/github/issues/stfsy/node-cloudfoundry-actuator.svg)](https://github.com/stfsy/node-cloudfoundry-actuator/issues)
[![License](https://img.shields.io/npm/l/node-cloudfoundry-actuator.svg)](https://github.com/stfsy/node-cloudfoundry-actuator/blob/master/LICENSE)


Actuator support for NodeJS Cloud Foundry Applications.

Currently provides **health** and **info** endpoints for Cloud Foundry Apps Manager. These two and future Endpoints are restricted to users that 
- are currently logged into the Apps Manager and 
- have sufficient privileges to view sensitive information.

Use [Cloud Foundry Actuator CLI](https://github.com/stfsy/node-cloudfoundry-actuator-cli) to generate a build **info** file ahead of deployment time. This file is optional, but we can't show version infos without it. 

**Health** status will be shown automatically and will be costumizable in the future.

See [Express Cloud Foundry Actuator Middleware Example](https://github.com/stfsy/express-cloudfoundry-actuator-middleware-example) for an example application with full integration of [Cloud Foundry Actuator CLI](https://github.com/stfsy/node-cloudfoundry-actuator-cli) and [Express Cloud Foundry Actuator Middleware](https://github.com/stfsy/node-cloudfoundry-actuator).

## Installation

```
npm install node-cloudfoundry-actuator --save
```

## Example
The **Cloud Foundry Apps Manager** needs to be able to call various actuator endpoints to fetch health state and build informations. Applications integrating this library need to expose these **endpoints**.

A typical **Connect** middleware implementation might look like this:
```js
'use strict'

const Actuator = require('node-cloudfoundry-actuator')
const actuator = new Actuator()

module.exports = () => {
    return (req, res, next) => {
        try {
            actuator.handle(req, res, next)
        } catch (e) {
            next()
        }
    }
}
```

The **main** class of this library has one public method **handle** which accepts a **HttpRequest** and **HttpResponse**. Instances of this class will handle positive responses and expect the implementing library to handle errors.

Only requests to a path matching **/cloudfoundryapplication[/\*]** will be intercepted and answered.

## Screenshots

### App overview
![Cloud Foundry App overview with Health Check](readme_cf_app_overview.png)

### Settings with app short info
![Cloud Foundry App settings with short app info](readme_cf_app_settings.png)
### Settings with app info popup
![Cloud Foundry App settings with app info popup](readme_cf_app_info.png)

## License

This project is distributed under the MIT license.