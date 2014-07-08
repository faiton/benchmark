suite('Text', function(){
    var str = 'Hello World!',
        re;

    setup(function(){
        re = /o/;
    });

    teardown(function(){
        str = '';
    });

    add('RegExp#test', function(){
        re.test(str);
    });

    add('String#indexOf', function(){
        str.indexOf('o') > -1;
    });
});


suite('Timeout', function(){
    add('setTimeout 4x', function(deferred){
        setTimeout(function(){
            deferred.resolve();
        }, 4);
    });
    add('setTimeout 20x', function(deferred){
        setTimeout(function(){
            deferred.resolve();
        }, 20);
    });
});
