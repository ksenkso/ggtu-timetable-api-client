require('dotenv').config();
require('jest-localstorage-mock');
if (typeof global.atob === "undefined") {
    global.atob = function (str) {
        return Buffer.from(str, 'base64').toString('binary');
    }
}
