'use strict'

const Endpoint = require('./endpoint')

class InfoEndpoint extends Endpoint {

    constructor() {
        super({
            name: 'info'
        })
    }

    handle(req, res) {
        super.handle(req, res)
        // TODO
        // no more hard coding
        return {
            build: {

            },
            git: {
                commit: {
                    "id": "7adb64f",
                    "time": "2016-08-17T19:30:34+0200"
                }
            }
        }
    }
}

module.exports = InfoEndpoint