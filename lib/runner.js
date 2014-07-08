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
    var index = 0, suite;

    function next() {
        if (suite = suites[index++])
            suite.run(next);
        else return false;
    }

    next();
};

function addSuite(name, fn) {
    var suite = Suite(name, fn);

    suites.push(suite);

    suite
        .use(reporter)
        .evaluate();
}

function beforeSuite(fn) {
    var suite = suites[suites.length - 1];

    suite.before(fn);
}

function afterSuite(fn) {

}

function addTest(name, fn) {
    var suite = suites[suites.length - 1];

    if (!suite)
        throw new Error('Define "suite" first.');

    suite.add(name, fn);
}
