'use strict'

class NpmBuildInfoContributor {

    getContext() {
        return "build"
    }

    getInfo() {
        return {
            name: process.env.npm_package_name,
            version: process.env.npm_package_version
        }
    }
}

module.exports = new NpmBuildInfoContributor()