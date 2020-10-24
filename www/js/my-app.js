  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/index/',
        url: 'index.html',
      },
      {
        path: '/anotador/',
        url: 'anotador.html',


      },
    ]

  });

var mainView = app.views.create('.view-main');
var router = mainView.router;
//console.log(router);

var j1 = '';
var j2 = '';

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    //console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
/*$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})*/


// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    //console.log(e);
    console.log("index ready");
    $$('#ini').on('click',function(){
        n = $$('#njds').val();
        console.log(n);
        j1 = $$('#j1in').val();
        j2 = $$('#j2in').val();
        if(j1=='' || j2==''){
            app.dialog.alert('Completa todos los campos', 'Anotador');
            /*app.dialog.alert('Completa todos los campos', 'Anotador',function(){
                console.log('cuando apreto ok?')}); <-- se ejecuta cuando apreto el 'ok'
                del dialog*/
        }else {
            router.navigate('/anotador/');

        }

    });

})

$$(document).on('page:init', '.page[data-name="anotador"]',function(e){
    //console.log(e);
    console.log("anotador ready");

});
