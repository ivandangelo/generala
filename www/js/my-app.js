var j1 = '';
var j2 = '';
var id = '';
var nroJugadores = 0;
var valoresJuegos={7:20,8:30,9:40,10:50,11:100}; /*{id,pts}*/
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
var acDados = app.actions.create({
    buttons:[
        {
            text:'Dados',
            label: true
        },
        {
            text:'Uno',
            onClick: function() {
                puntosDados(1);
            }
        },
        {
            text:'Dos',
            onClick: function() {
                puntosDados(2);
            }
        },
        {
            text:'Tres',
            onClick: function() {
                puntosDados(3);
            }
        },
        {
            text:'Cuatro',
            onClick: function() {
                puntosDados(4);
            }
        },
        {
            text:'Cinco',
            onClick: function() {
                puntosDados(5);
            }
        },
        {
            text:'Tachar',
            onClick: function() {
                tachar();
            }
        },

    ]

});
var acJugadas = app.actions.create({
    buttons:[
        {
            text:'Jugada',
            label: true
        },
        {
            text:'Servido',
            onClick: function() {
                puntosJuego('servido');
            }
        },
        {
            text:'No servido',
            onClick: function() {
                puntosJuego('noServido');
            }
        },
        {
            text:'Tachar',
            onClick: function() {
                tachar();
            }
        },

    ]

});

var acDGenerala = app.actions.create({
    buttons:[
        {
            text:'Jugada',
            label: true
        },
        {
            text:'Anotar',
            onClick: function() {
                puntosJuego('dGenerala');
            }
        },
        {
            text:'Tachar',
            onClick: function() {
                tachar();
            }
        },
 
    ]

});


//console.log(router);

function puntosJuego(tipoJuego){
    let ptosASetear = 0;
    let idAux = id.split('-');
    ptosASetear = valoresJuegos[idAux[1]];
    if(tipoJuego == 'servido') {
        ptosASetear+=5;
        $$('#'+id).text(ptosASetear);

    }else if(tipoJuego == 'noServido') {
        $$('#'+id).text(ptosASetear);

    }else if(tipoJuego == 'dGenerala'){
        $$('#'+id).text(ptosASetear);

    }
    calcularTotal(id);


}

function puntosDados(cantidadDados){
    let idAux= id.split('-');
    let valorDado = parseInt(idAux[1]);
    valorDado=valorDado*cantidadDados;
    $$('#'+id).text(valorDado);
    calcularTotal(id);
    //console.log(idAux);
    //console.log(cantidadDados);

}

function calcularTotal(idJugador){
    let total=0;
    let idAux= idJugador.split('-');

    for(let i=1;i<=11;i++){
        let contenidoCasillero=$$('#'+idAux[0]+'-'+i).text();
        if(contenidoCasillero!='x' && contenidoCasillero!='-'){
            total+=parseInt(contenidoCasillero);

        }

    }

    $$('#tot'+idAux[0]).text(total);



}

function tachar(){
    $$('#'+id).text('x');
    calcularTotal(id);

}


function buildTablaJugador(n){

    let j;
    (n=='1') ? (j=j1) : (j=j2);
    for(let i=0;i<13;i++){

        if(i>0 && i<7){
            $$('#ptosJ'+n).append('<button id="j'+n+'-'+i+'" class="button segmented segmented-raised dados">-</button>');
        }
        if(i>=7 && i<=11){
            $$('#ptosJ'+n).append('<button id="j'+n+'-'+i+'" class="button segmented segmented-raised jugada">-</button>');

        }
        if(i==0){$$('#ptosJ'+n).append('<button class="button button-fill">'+j+'</button>');}
        if(i==12) {$$('#ptosJ'+n).append('<button id="totj'+n+'" class="button segmented segmented-raised jugadores">0</button>');}

    }

    /*console.log(nroJugadores);
    for(key in puntosJuegos){
        console.log('id '+key+' ptos '+puntosJuegos[key]);

    }*/

}

function buildTablaPtos(){

 j=['PUNTAJES','UNO','DOS','TRES','CUATRO','CINCO','SEIS',
    'ESCALERA','FULL','POKER','GENERALA','D.GENERALA','TOTAL'];
    for(let i=0;i<13;i++){
        $$('#jugadas').append('<button class="button button-fill">'+j[i]+'</button>');

    }


}


function limpiar(){
    console.log('entro a funcion limpiar');
    //$$('.dados .jugada').text('-'); no funciono asi
    $$('.dados').text('-');
    $$('.jugada').text('-');
    $$('.jugadores').text('0');

}

function volver(){
    console.log('entro a funcion volver');
    limpiar();
    router.navigate('/index/');


}

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
    //console.log("index ready");
    $$('#ini').on('click',function(){
        nroJugadores = $$('#njds').val();
        //console.log(n);
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
    //console.log("anotador ready");
    buildTablaPtos();

    for(let i = 1; i<=nroJugadores;i++){
        buildTablaJugador(i);
    }

    $$('#volver').on('click',function(){
        volver();

    });

    $$('.dados').on('click',function(){
        acDados.open();
        //console.log($$(this).attr('id'));
        id=$$(this).attr('id');

    });
    $$('.jugada').on('click',function(){

        id=$$(this).attr('id');
        if(id.includes('11')) {
            acDGenerala.open();


        }else {
            acJugadas.open();
        }

        //console.log($$(this).attr('id'));

    });
    $$('.open-confirm').on('click', function () {
        app.dialog.confirm('Volver?Se borraran los puntos','', function () {
        volver();

        });
    

    });

    $$('.open-confirm-clear').on('click', function () {
        app.dialog.confirm('Limpiar?Se borraran los puntos','', function () {
        limpiar();

        });
    

    });

    $$('.open-confirm-terminar').on('click', function () {


        var pts1 = $$('#totj1').text();
        var pts2 = $$('#totj2').text();
        var msj= j1+': '+pts1+'<br>'+j2+': '+pts2; //HABIA Q PONER UN MALDITO BR, NO UN \N
        //console.log(msj);
        app.dialog.alert(msj, 'Puntuaciones');


    });


});