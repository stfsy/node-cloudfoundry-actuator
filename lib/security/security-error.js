'use strict'

class SecurityError {

    constructor(status, message) {
        this._status = status
        this._message = message;
    }

    static Forbidden(message) {
        return new SecurityError(403, message)
    }

    static Unauthorized(message) {
        return new SecurityError(401, message)
    }

    getStatus() {
        return this._status
    }

    getMessage() {
        return this._message
    }
}

module.exports = SecurityError