const screen = document.querySelector(".screen"); //Se encarga de regresar el primer elemento del doc
const buttons = document.querySelectorAll(".btn"); //Se encarga de regresar el primer elemento del doc

let contador = localStorage.getItem('contador');
if (contador === null) {
    contador = 0;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonPress = button.textContent;
        //se encarga del funcionamiento del boton C
        if (button.id === "clear") {
            screen.textContent = "0";
            return;
        }
        //se encarga del funcionamiento del boton Back
        if (button.id === "delete") {
            if (screen.textContent.length === 1 || screen.textContent === "Sintaxis Error" || screen.textContent === "Infinity") {
                screen.textContent = "0";
            } else {
                screen.textContent = screen.textContent.slice(0, -1);
            }
            return;
        }
        //se encarga del funcionamiento del boton igual
        if (button.id === "equal") {
            try {
                if (screen.textContent == "++") {
                    window.location.href = 'Egg.html'; //HUEVO
                }
                if (screen.textContent == "/0") {
                    window.location.href = 'Esplota.html'; //Final 1 = Explosion
                    contador++; //No es canon legalmente
                }
                if (screen.textContent == "18*59") {
                    window.open('https://www.nintendo.com/us/store/products/calculator-switch/'); //Final 2 = Calculadora
                    //window.location.href = ''; original link style
                    if (contador == 0){
                        contador++;
                    } else {
                        contador = 0;//contador--; la idea original era esta pero es mejor un reset total
                    }
                }
                if (screen.textContent == "18*12*87") {
                    window.open('https://www.youtube.com/watch?v=ZQo8YaG1hhs'); //Final 3 = Nunca voy a renunciar 🎶     
                }
                if (screen.textContent == "1987*5/5") {
                    window.open('https://www.youtube.com/watch?v=mCh6VpxLubc'); //Final 4 = Very Very Scary JumpScare 👻
                    if (contador == 1){
                        contador++;
                    } else {
                        contador = 0;
                    }
                }
                if (screen.textContent == "1004+1005") {
                    window.open('https://signup.leagueoflegends.com/es-mx/signup/redownload'); //Final 5 = Descargando league of legends
                    if (contador == 2){
                        contador++;
                    } else {
                        contador = 0;
                    }
                }
                //final 6 secreto = Final CSS 522 = 261 + 261, El eggstyles.css y re hacer la documentacion.
                if (contador == 3){
                    window.location.href = 'Secreto.html'; //HUEVO
                }
                screen.textContent = eval(screen.textContent);
            } catch {
                screen.textContent = "Sintaxis Error"; //Esto sirve para mostrar el error
            }
            return;
        }
        if (screen.textContent === "0" || screen.textContent === "Sintaxis Error" || screen.textContent === "Infinity") { //el infinity salio de la nada...
            screen.textContent = buttonPress;
        } else {
            screen.textContent += buttonPress;
        }
    })
})
function Tuto() {
    window.open('https://www.youtube.com/watch?v=ELSm-G201Ls')
    window.location.href='Index.html'
}
//🦀 Cangrejo en el codigo :O

//funcion volver al index
function VolverAlIndex(){
    window.location.href = "/Principal/Principal.html"
}