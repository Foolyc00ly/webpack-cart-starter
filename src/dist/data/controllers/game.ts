import _ from 'underscore';

export const moduleCart:Object=(()=>{
    let numeros:number[]=[2,3,4,5,6,7,8,9,10];
    let deck:string[]=[];//*2C 2D 2C 2H 2S
    const tipos:string[]=['C','D','H','S'];
    const especiales:string[]=['A','J','Q','K'];

    //*REFERENCIAS#HTLM#################################
    const btnPedir:Element|null=document.querySelector('#btnPedir');
    const btnDetener:Element|null=document.querySelector('#btnDetener');
    const btnNuevo:Element|null=document.querySelector('#btnNuevo');

    const puntosHTML:NodeListOf<HTMLElement>=document.querySelectorAll('small');
    const divCartasJugadores:NodeListOf<HTMLElement>=document.querySelectorAll('.divCartas');

    const tituloMía:Element|null=document.querySelector('.titulo h1');
    //*#################################################
    //*PUNTAJES#########################################
    let puntosJugadores:number[]=[]
    //*#################################################
    const error=(message:string):never=>{throw new Error(message);}
    //*INICIAR JUEGO#####################################
    //*#################################################
    const inicializarJuego=(numJugadores:number=2)=>{
        deck=crearDeck();
        puntosJugadores=[];
        for(let i=0;i<numJugadores;i++){
            puntosJugadores.push(0);
        }
        puntosHTML.forEach((p:HTMLElement)=>p.innerHTML='0');
        divCartasJugadores.forEach((dcj:HTMLElement)=>dcj.innerHTML='');
        (btnPedir as HTMLInputElement).disabled=false;
        (btnDetener as HTMLInputElement).disabled=false;
        (tituloMía as HTMLElement).innerHTML='<b>Amo mucho a Mía♥♥♥</b>';
    };
    //*#################################################
    //*#################################################
    const crearDeck=():string[]=>{
        deck=[];
        numeros.forEach(n=>tipos.forEach(t=>deck.push(n+t)));
        tipos.forEach(t=>especiales.forEach(e=>deck.push(e+t)));
        return deck=_.shuffle(deck)
    }
    inicializarJuego(2);
    const pedirCarta=():string=>deck.length===0?error('Ya no Hay Cartas'):(deck.pop() || '');
    const valorCarta=(carta:string):number=>{
        const valor=carta.substring(0,carta.length-1);
        let puntos:number=0;
        console.log('pido carta',carta)
        console.log('el valor es',valor);
        return !isNaN(valor as any)
            ?(puntos=(valor as any)*1):(valor==='A'?11:10);
    }
    
    //*PUNTAJE#####################################
    const acumularPuntos=(cartaNueva:string,turno:number):number=>{
        puntosJugadores[turno]+=valorCarta(cartaNueva);
        puntosHTML[turno].innerHTML=puntosJugadores[turno].toString();
        return puntosJugadores[turno];
    }
    //*############################################
    //*CREAR CARTA#################################
    const crearCarta=(cartaNueva:string,turno:number)=>{
        /* <img class="carta" src="./assets/cartas/2C.png"/> */
        const imgCarta:HTMLImageElement=document.createElement('img');
        imgCarta.src=`./assets/cartas/${cartaNueva}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    };
    //*############################################
    //*DETERMINAR GANADOR##########################
    const determinarGanador=()=>{
        const[puntosMinimos,puntosComputadora]=puntosJugadores;
        setTimeout(()=>{
            if(puntosComputadora===puntosMinimos){
                alert('Nadie Gana');
            }else if(puntosMinimos>21){
                alert('Computadora Gana');
            }else if(puntosComputadora>21){
                alert('Jugador Gana')
            }else if(puntosMinimos<21 && (puntosComputadora>puntosMinimos || puntosComputadora<=21)){
                alert('Computadora Gana')
            }
        },25);
    }
    //*############################################
    //*TURNO DE LA COMPUTADORA#####################
    const turnoComputadora=(puntosMinimos:number)=>{
        let puntosComputadora:number;
        do{
            const cartaNueva:string=pedirCarta();
            puntosComputadora=acumularPuntos(cartaNueva,puntosJugadores.length-1);
            crearCarta(cartaNueva,puntosJugadores.length-1);
        }while((puntosComputadora<puntosMinimos) && (puntosMinimos<=21));
        determinarGanador();
    }
    //*############################################
    //*EVENTOS##############################
    const btnPedirYa:void|undefined=btnPedir?.addEventListener('click', () =>{
        const cartaNueva:string=pedirCarta();
        let puntosJugador:number=acumularPuntos(cartaNueva,0);
        crearCarta(cartaNueva,0);
        if(puntosJugador>21){
            console.warn('Lo siento mucho,perdiste');
            (btnPedir as HTMLInputElement).disabled=true;
            (btnDetener as HTMLInputElement).disabled=true;
            turnoComputadora(puntosJugador);
        }else if(puntosJugador===21){
            console.warn('21, genial');
            (btnPedir as HTMLInputElement).disabled=true;
            (btnDetener as HTMLInputElement).disabled=true;
            turnoComputadora(puntosJugador);
        }
    });
    const btnDetenerYa:void|undefined=btnDetener?.addEventListener('click',()=>{
        (btnPedir as HTMLInputElement).disabled=true;
        (btnDetener as HTMLInputElement).disabled=true;
        turnoComputadora(puntosJugadores[0]);
    });
    const btnNuevoYa:void|undefined=btnNuevo?.addEventListener('click',()=>{
        console.clear();
        inicializarJuego(2);
    });
    btnPedirYa;
    btnDetenerYa;
    btnNuevoYa;
    //*#####################################
    return {
        nuevoJuego:inicializarJuego
    };
})()

