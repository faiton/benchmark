suite('Title', function(){
    var str = 'Hello World!';

    // setup(function(){
    //     str = 'Hello World!';
    // });

    // teardown(function(){
    //     str = '';
    // });

    add('RegExp#test', function(done){
        /o/.test(str);
        done.resolve();
    });

    add('String#indexOf', function(){
        str.indexOf('o') > -1;
    });
});
