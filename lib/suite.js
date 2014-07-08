/**
 * Load dependencies.
 */

var Emitter   = require('events').EventEmitter,
    util      = require('util');

var Benchmark = require('benchmark');

/**
 * Expose.
 */

module.exports = Suite;


/**
 * Make it "Emitter"
 */

util.inherits(Suite, Emitter);

/**
 * Suite constructor.
 *
 * @constructor
 * @param {String}   name
 * @param {Function} fn
 * @return {Suite}
 * @api public
 */

function Suite(name, fn){
    if (! (this instanceof Suite))
        return new Suite(name, fn);

    return this.initialize(name, fn);
}

/**
 * Initialize Suite
 *
 * @param  {String}   name
 * @param  {Function} fn
 * @return {Suite}
 */

Suite.prototype.initialize = function(name, fn){
    this.name   = name;
    this.fn     = fn;

    var options = {
            onComplete: complete.bind(this)
        };

    this.ctx = new Benchmark.Suite(name, options);

    Emitter.call(this);

    function complete(){
        this.emit('complete', this.ctx);
    }

    return this;
};


Suite.prototype.evaluate = function(){
    this.fn.call(this);
    this.emit('ready');
};


/**
 * Use plugins.
 *
 * @param  {Function} fn
 * @return {Suite}
 */

Suite.prototype.use = function(fn) {
    if (typeof fn == 'function')
        fn(this);
    return this;
};

/**
 * Add benchmark.
 *
 * @param {String} name [optional]
 * @param {Function} fn
 */

Suite.prototype.test =
Suite.prototype.add = function(name, fn){
    if (typeof name == 'function')
        fn = name, name = '';

    var options = {
            name        : name,
            fn          : fn,
            defer       : !! fn.length,
            onComplete  : complete.bind(this),
            onCycle     : cycle.bind(this)
        };

    this.ctx.add(options);

    function complete(e){
        this.emit('cycle', e.target);
    }

    function cycle(e) {
        var target = e.target;
        if (target.error)
            return this.emit('error', target.error, target)
        this.emit('test', target);
    }
};


Suite.prototype.run = function(){
    this.emit('start');
    this.ctx.run({ 'async': true });
};
