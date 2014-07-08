/**
 * Dependencies.
 */

var Suite = require('./suite.js');

/**
 * Default built-in reporter.
 */

var reporter = require('./reporter.js');

/**
 * Collection.
 */

var suites = [];


/**
 * Expose facade.
 */

module.exports.facade = {
    suite: addSuite,
    setup: beforeSuite,
    teardown: afterSuite,
    add: addTest,
    test: addTest
};

module.exports.reporter = function(r) {
    if (typeof r == 'function')
        return reporter = r;

    try {
        reporter = require(r);
    } catch (e) {
        throw new Error('Reporter "' + r + '" can\'t be loaded.');
    }
};

module.exports.run = function(){
    suites[0].run();
};

function addSuite(name, fn) {
    var suite = Suite(name, fn);

    suites.push(suite);

    suite
        .use(reporter)
        .evaluate();

    suite.run();
}

function beforeSuite(fn) {

}

function afterSuite(fn) {

}

function addTest(name, fn) {
    var suite = suites[suites.length - 1];

    if (!suite)
        throw new Error('Define "suite" first.');

    suite.add(name, fn);
}
