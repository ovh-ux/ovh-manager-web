// Testacular configuration
// Generated on Fri Mar 08 2013 17:53:16 GMT+0100 (CET)


// base path, that will be used to resolve files and exclude
basePath = '../..';
utilsDir = '../components/ovh-utils-angular';

// list of files / patterns to load in the
files = [
    JASMINE,
    JASMINE_ADAPTER,
    //require
    utilsDir + '/lib/jquery.js',
    utilsDir + '/lib/jquery.cookie.js',
    utilsDir + '/lib/jquery.i18n.properties-1.0.9.js',
    utilsDir + '/lib/bootstrap/bootstrap.js',
    utilsDir + '/lib/angular.js',
    utilsDir + '/lib/ui-bootstrap-0.1.2-ovh.js.min',
    utilsDir + '/bin/ovh-utils-angular-4.0.8.js',
    utilsDir + '/core.js',
    'js/app/services/services.js',
    'js/app/services/**/**/*.js',
    'js/app/directives/directives.js',
    'js/app/directives/**/*/*.js',
    'js/app/controllers/**/*/*.js',
    'js/app/managerApp.js',
    //midway conf
    'test/midway/*Spec.js'
];


// list of files to exclude
exclude = [

];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_ERROR;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['PhantomJS'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = true;
