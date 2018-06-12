module.exports = {
    "extends": "airbnb-base",
    "env": {
        "node": true,
        "browser": true,
        "es6": true,
        "jquery": true,
        "jasmine": true,
        "mocha": true
    },
    "globals": {
        "_": true,
        "$": true,
        "JSURL": true,
        "angular": true,
        "moment": true,
        "punycode": true,
        "URI": true,
        "Chart": true,
        "ipaddr": true,
        "JustGage": true,
        "filesize": true,
        "validator": true,
        "Raven": true
    },
    "rules": {
        "no-param-reassign": 0,
        "max-len": 0
    }
};