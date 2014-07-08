suite('Text', function(){
    var str = 'Hello World!';

    // setup(function(){
    //     str = 'Hello World!';
    // });

    // teardown(function(){
    //     str = '';
    // });

    add('RegExp#test', function(deferred){
        /o/.test(str);
    });

    add('String#indexOf', function(){
        str.indexOf('o') > -1;
    });
});


suite('Timeout', function(){
    add('setTimeout 4', function(deferred){
        setTimeout(function(){
            deferred.resolve();
        }, 4);
    });
    add('setTimeout 10', function(deferred){
        setTimeout(function(){
            deferred.resolve();
        }, 20);
    });
});
