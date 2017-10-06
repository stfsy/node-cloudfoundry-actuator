'use strict'

const log = require('util').debuglog('cloudfoundry-actuator-middleware');

const https = require('https')
const http = require('http')
const url = require('url')

/**
 * 
 * @private
 */
class HttpAdapter {

    /**
     * 
     * @private
     * @param {String} url 
     * @param {Object} headers 
     * @param {String} body 
     * @returns {Promise<Object>}
     */
    _fetch(absoluteUrl, headers, body) {
        log('fetch httpAdapter calling %s', absoluteUrl)
        var parsedUrl = url.parse(absoluteUrl)
        return new Promise((resolve, reject) => {

            const options = {
                headers: headers,
                hostname: parsedUrl.hostname,
                port: parsedUrl.port,
                path: parsedUrl.pathname,
                method: 'GET',
                // TODO
                // make this an option, like spring-boot-actuator did
                rejectUnauthorized: false
            };

            let responseBody = []

            // tried to use https everywhere but ci would force including
            // a private key which isn't best pratice, too.
            // so let's decide here what to use
            const req = (() => parsedUrl.protocol === 'https' ? https : http)() //
                .request(options, (res) => {
                    const status = res.statusCode;
                    log('fetch httpAdapter %s withStatus %s', absoluteUrl, status)
                    res.on('data', (d) => {
                        responseBody.push(d)
                    })

                    res.on('end', () => {
                        const body = responseBody.join('')
                        if (status == '200') {
                            log('fetch httpAdapter resolving withResult %s', responseBody.join(''))
                            resolve(JSON.parse(body))
                        } else {
                            log('fetch httpAdapter rejecting withResult %s', body)
                            reject(body)
                        }
                    })
                });

            req.on('error', (e) => {
                log('fetch httpAdapter rejecting withError %O', e)
                reject(e)
            });

            req.end();
        })
    }
}

module.exports = HttpAdapter