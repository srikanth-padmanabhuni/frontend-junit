module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'browserify'],
    plugins: [
        require('karma-jasmine'),
        require('karma-phantomjs-launcher'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-json-reporter'),
        require('karma-spec-reporter'),
        require('karma-browserify'),
        require('karma-babel-preprocessor')
      ],
    preprocessors: {
      'src/**/*.test.js':  ['browserify']
    },
    browserify: {
        debug: true,
        transform: [
            ['babelify', {
                presets: [
                    "@babel/preset-env",
                    ["@babel/preset-react",
                    {
                      runtime: "automatic"   
                    }]
                ], 
            }]
        ],
        extensions: ['.js']
    },
    files: [
      'src/**/*.test.js',
    ],
    coverageReporter: {
        reporters: [
            { type: 'json' }
        ]
    },
    reporters: ['progress', 'json'],
    jsonReporter: {
      stdout: true,
      outputFile: 'test-results.json'
    },
    browsers: ['ChromeHeadless']
  });
};
