suite('Title', function(){
    var str;

    setup(function(){
        str = 'Hello World!';
    });

    teardown(function(){
        str = '';
    });

    add('RegExp#test', function(done){
        /o/.test(str);
        done()
    });

    add('String#indexOf', function(){
        str.indexOf('o') > -1;
    });
});
