/**
 * @fileoverview Responsible for giving unsandboxed extensions their extra tools.
 * This is exposed on the VM for ease of use and to prevent duplicate code.
 */

class ExtensionTools {
    // Internal functions.
    static xmlEscape = require('../util/xml-escape');
    static uid = require('../util/uid');
    static fetchStatic = require('../util/tw-static-fetch');
    static fetchWithTimeout = require('../util/fetch-with-timeout').fetchWithTimeout;
    static setFetchWithTimeoutFetchFn = require('../util/fetch-with-timeout').setFetch;
    static isNotActuallyZero = require('../util/is-not-actually-zero');
    static getMonitorID = require('../util/get-monitor-id');
    static maybeFormatMessage = require('../util/maybe-format-message');
    static newBlockIds = require('../util/new-block-ids');
    static hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
    // External classes / functions.
    static nanolog = require('@turbowarp/nanolog');
    static log = require('../util/log');
    static buffers = require('buffer');
    static TextEncoder = require('text-encoding').TextEncoder;
    static TextDecoder = require('text-encoding').TextDecoder;
    static twjson = require('@turbowarp/json');
    // Internal classes.
    static math = require('../util/math-util');
    static assets = require('../util/tw-asset-util');
    static base64 = require('../util/base64-util');
    static strings = require('../util/string-util');
    static variables = require('../util/variable-util');
    static asyncLimiter = require('../util/async-limiter');
    static clone = require('../util/clone');
    static sanitizer = require('../util/value-sanitizer');
    static jsonrpc = require('../util/jsonrpc');
    static color = require('../util/color');
    static rateLimiter = require('../util/rateLimiter');
    static scratchLinkWebSocket = require('../util/scratch-link-websocket');
    static taskQueue = require('../util/task-queue');
    static timer = require('../util/timer');
    static sharedDispatch = require('../dispatch/shared-dispatch');
    // Instanced dispatchers.
    static centralDispatch = require('../dispatch/central-dispatch');
    static workerDispatch = require('../dispatch/worker-dispatch');
}

module.exports = ExtensionTools;
