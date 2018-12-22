'use strict'

const spawn = require('child_process').spawn

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
        return "disk-space"
    }

    getInfo() {
        return {
            status: "UP",
            details: {
                
            }
        }
    }
}

// module.exports = BasicHealthContributor