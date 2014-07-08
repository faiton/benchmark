var stdout = process.stdout;

module.exports = reporter;

function reporter(suite, options) {
    options = options || {};

    var context = suite.ctx;

    var row = serialize.bind(context);

    suite.on('start', function(){
        writeline(indent(suite.name, 2));
        writeline();
    });

    suite.on('test', function(target){
        replaceline(row(target));
    });

    suite.on('cycle', function(){
        writeline();
    });

    suite.on('complete', function(){
        var results = context.sort().map(row);

        replaceline(results.join('\n'), true);
        writeline();
    });

    return this;
};



function serialize(target, n) {
    if (typeof n == 'number')
        n = (this.length - n) + '.';
    else if (n == void 0)
        n = '•';

    n = fill(n, 3);

    var name = fill(target.name, 16),
        hz   = ((target.hz * 100 | 0) / 100) + ' o/s';

    var text = [n, name, hz].join(' ');

    return indent(fill(text), 4);
}


function indent(str, size) {
    while (size--)
        str = ' ' + str;
    return str;
}

function fill(str, size) {
    str = str || '';
    size = size || 72;

    var length = str.length;

    while (++length < size)
        str += ' ';

    return str;
}


function writeline(line) {
    line = '\n' + (line || '');
    stdout.write(line);
}

function replaceline(line, count) {
    line = '\r' + line;

    if (count == void 0)
        return stdout.write(line);

    if (typeof count != 'number')
        count = line.match(/\n/g).length + 1;

    line = '\x1b[' + count + 'A' + line;

    stdout.write(line);
}
