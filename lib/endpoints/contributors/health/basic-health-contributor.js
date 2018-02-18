'use strict'

const InfoContributor = require('../info-contributor')

/** 
 * 
 * @extends InfoContributor
 */
class BasicHealthContributor extends InfoContributor {

    constructor() {
        super()
    }

    getContext() {
        return "service"
    }

    getInfo() {
        return {
            status: "UP"
        }
    }
}

module.exports = BasicHealthContributor