const MEDIDAS_TEMPO = {
    SEGUNDO: 1000,
    MINUTO: 60 * 1000,
    HORA: 60 * 60 * 1000 ,
    DIA: 24 * 60 * 60 * 1000
}

const listaId = [];

const createVideo = function(link){
    let video = document.createElement("video");
    video.setAttribute("autoplay","");
    video.setAttribute("src", link);
    video.setAttribute("height", "0");
    video.setAttribute("width", "0");
    document.body.appendChild(video);
}

class Alarme {
    constructor(Timer, link){
        this.Timer = Timer;
        this.link = link;
    }

    playVideo = function(){
        createVideo();
    }
}

class Timer {
    constructor(hora, minuto, segundo){
        this.hora = hora;
        this.minuto = minuto;
        this.segundo = segundo;
    }

    decrescer = function(id){
        console.log("id do setInterval:" + id);
        if(this.segundo != 0){
            this.segundo--;
        }else{            
            if(this.hora === 0 && this.minuto === 0){
                clearInterval(id);                
                return -1;
            }else if(this.minuto != 0)
                this.minuto--;
            else{
                if(this.hora != 0){
                    this.minuto = 59;
                    this.hora--;
                }                
            }
            this.segundo = 59;
        }       
    }
}

const limpar = function(){
    let timer = document.getElementsByClassName("timer");
    for(let t of timer)
        t.innerText = "";    
}

const preencher = function(obj){
    document.getElementById("hora").innerText = obj["hora"];
    document.getElementById("minuto").innerText = obj["minuto"];
    document.getElementById("segundo").innerText = obj["segundo"];
}

const contar = function(alarme, id){    
    let t = alarme.Timer.decrescer(id);
    limpar();
    preencher(alarme.Timer);

    if(t == -1)
        alarme.playVideo();
}
const verificarValores = function(hora, minuto, segundo){
    if(hora >= 0 && minuto >= 0 && segundo >= 0){
        if(minuto <= 59 && segundo <= 59)
            return new Timer(parseInt(hora),parseInt(minuto),parseInt(segundo));
    }else{
        return null;
    }
}

const iniciar = function(){

    for(let i of listaId){
        clearInterval(i);        
    }

    let hora =  parseInt(document.getElementById("inputHora").value);
    let minuto = parseInt(document.getElementById("inputMinuto").value);
    let segundo = parseInt(document.getElementById("inputSegundo").value);
    let link = document.getElementById("linkVideo").value;

    const timer = verificarValores(hora, minuto, segundo);
    
    if(timer != null){ 
        let alerta = new Alarme(timer,link);       
        let id = setInterval(function(){
            contar(alerta, id) 
        }, 100);        
        preencher(timer);
        listaId.push(id);
    }else{
        alert("Erro na entrada de valores");
        document.getElementById("inputHora").value = 0;
        document.getElementById("inputMinuto").value= 0;
        document.getElementById("inputSegundo").value= 0;
    }
    
    
}

