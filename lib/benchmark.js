/**
 * Load dependencies.
 */

var Benchmark = require('benchmark');

/**
 * Collection.
 */

var suites = [];

/**
 * Expose facade.
 */

module.exports.facade = {
    suite: function(name, fn){
        Suite(name, fn);
    },
    add: function(name, fn){
        suites.last.add(name, fn);
    },
    setup: function(fn){

    },
    teardown: function(fn){

    }
};


/**
 *
 */

Object.defineProperty(suites, 'last', {
    get: function() {
        return this[this.length - 1];
    },
    set: function(suite) {
        if (!~this.indexOf(suite))
            this.push(suite);
        return suite;
    }
});


/**
 * @type {Object}
 */

Benchmark.Suite.options = {
    onStart: function(){
        console.log(this.name);
    },
    onCycle: function(e) {
        console.log(String(e.target));
        if (e.target.error)
            console.log(e.target.error);
    },
    onComplete: function(){
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    }
};


function Suite(name, fn){
    if (! (this instanceof Suite))
        return new Suite(name, fn);

    this.initialize(name, fn);

    return this;
}


Suite.prototype.initialize = function(name, fn){
    this.name   = name;
    this.suite  = new Benchmark.Suite(name);

    suites.last = this;

    fn.call(this);

    this.suite.run({ 'async': true });
};


Suite.prototype.add = function(name, fn){
    return this.suite.add(name, fn, {
        defer: fn.length
    });
};
