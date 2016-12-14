// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) ***REMOVED***
  config.set(***REMOVED***
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('angular-cli/plugins/karma')
    ],
    files: [
      ***REMOVED*** pattern: './src/test.ts', watched: false ***REMOVED***
    ],
    preprocessors: ***REMOVED***
      './src/test.ts': ['angular-cli']
    ***REMOVED***,
    mime: ***REMOVED***
      'text/x-typescript': ['ts','tsx']
    ***REMOVED***,
    remapIstanbulReporter: ***REMOVED***
      reports: ***REMOVED***
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      ***REMOVED***
    ***REMOVED***,
    angularCli: ***REMOVED***
      config: './angular-cli.json',
      environment: 'dev'
    ***REMOVED***,
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'karma-remap-istanbul']
              : ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  ***REMOVED***);
***REMOVED***;
