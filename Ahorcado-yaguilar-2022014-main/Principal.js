const banco = ["fuente", "aviones", "daga", "estrella", "facultad"];

var palabra = banco[Math.floor(Math.random() * banco.length)]

const palabraN = palabra.split("");

for(i=0;i!=palabra.length;i++){
    palabraN[i]="_"
}

function escribir(){
    document.write("Hola");
}