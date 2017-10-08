'use strict'

/**
 * 
 */
class SecurityError {

    /**
     * 
     * @param {number} status status code
     * @param {string} message status reason
     */
    constructor(status, message) {
        this._status = status
        this._message = message;
    }

    /**
     * 
     * @param {string} message status reason
     * @returns {SecurityError} a new instance
     */
    static Forbidden(message) {
        return new SecurityError(403, message)
    }

    /**
     * 
     * @param {string} message status reason
     * @returns {SecurityError} a new instance
     */
    static Unauthorized(message) {
        return new SecurityError(401, message)
    }

    /**
     * 
     * @returns {number} status
     */
    getStatus() {
        return this._status
    }

    /**
     * 
     * @returns {string} message
     */
    getMessage() {
        return this._message
    }
}

module.exports = SecurityError