'use strict'

const InfoContributor = require('../info-contributor')

class ExpressMappingsContributor extends InfoContributor {
    
    constructor() {
        super()
    }

    getContext() {
        return 'mappings'
    }

    getInfo() {
        return {
            status: "UP",
            details: {
                
            }
        }
    }
}

module.exports = ExpressMappingsContributor