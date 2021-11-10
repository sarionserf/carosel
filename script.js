window.onload = function () {
    // Variables

    // Añadir las tres imágenes del directorio "img" al array IMAGENES.
    const IMAGENES = ["img/img1.jpg","img/img2.jpg","img/img3.jpg"];

    const TIEMPO_INTERVALO_MILESIMAS_SEG = 1000;

    // posición actual guarda el indice de la imágen que se está mostrando (del array IMAGENES)
    let posicionActual = 0;

    // variables con los elementos del DOM HTML, aplicar el selector necesario.
    let $botonRetroceder = document.getElementById("retroceder");
    let $botonAvanzar = document.getElementById("avanzar");
    let $imagen = document.getElementById("imagen");
    let $botonPlay = document.getElementById("play");
    let $botonStop = document.getElementById("stop");
    let $text = document.getElementById("text_mouse");
    

    // Identificador del proceso que se ejecuta con setInterval().
    let intervalo;

    // Funciones

    /**
     * Funcion que cambia la foto en la siguiente posicion
     */
    function pasarFoto() {
        // se incrementa el indice (posicionActual)

        
        posicionActual ++;

        if(posicionActual > IMAGENES.length - 1){

            posicionActual = 0;
        }
        // ...y se muestra la imagen que toca.
        renderizarImagen();
    }

    /**
     * Funcion que cambia la foto en la anterior posicion
     */

    function retrocederFoto() {
        // se incrementa el indice (posicionActual)

        posicionActual--;

        if(posicionActual === -1){

            posicionActual = 2;
        }

        // ...y se muestra la imagen que toca.
        renderizarImagen();
    }

    /**
     * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
     */
    function renderizarImagen() {
        $imagen.style.backgroundImage = `url(${IMAGENES[posicionActual]})`;
    }

    /**
     * Activa el autoplay de la imagen
     */
    function playIntervalo() {
        // Documentación de la función setInterval: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        // Mediante la función setInterval() se ejecuta la función pasarFoto cada TIEMPO_INTERVALO_MILESIMAS_SEG.
      
        intervalo = setInterval(pasarFoto,TIEMPO_INTERVALO_MILESIMAS_SEG);
        // Desactivamos los botones de control necesarios. Utilizando setAttribute y removeAttribute.

        $botonRetroceder.setAttribute("disabled","true") ;
        $botonAvanzar.setAttribute("disabled","true") ;
        $botonStop.removeAttribute("disabled","true") ;
        $botonPlay.setAttribute("disabled","true")
              

    }

    /**
     * Para el autoplay de la imagen
     */
    function stopIntervalo() {
        // Desactivar la ejecución de intervalo.
         clearInterval(intervalo);
        // Activamos los botones de control. Utilizando setAttribute y removeAttribute.

        $botonRetroceder.removeAttribute("disabled","true") ;
        $botonAvanzar.removeAttribute("disabled","true") ;
        $botonStop.setAttribute("disabled","true") ;
        $botonPlay.removeAttribute("disabled","true")

    }

    // Amb el deltaY podem saber si anem endevant o enrrera amb la rodeta ja que en dona un valor positiu si anem endevant i negatiu cap enrrera
    // Dons mirem si dona positiu que passi la foto cap endevant i si es negatiu dons va cap enrrere.

    function wheelOnImage(e){

        if(e.deltaY > 0){

            pasarFoto();
        }else{

            retrocederFoto()
        }
    
    }


    function showNameImg(e){



        $text.style.left=e.clientX;
        $text.style.top=e.clientY;




    }
    

    // Eventos
    // Añadimos los evenntos necesarios para cada boton. Mediante addEventListener.

    $botonRetroceder.addEventListener("click",retrocederFoto);

    $botonAvanzar.addEventListener("click",pasarFoto);

    $botonPlay.addEventListener("click",playIntervalo);
    
    $botonStop.addEventListener("click",stopIntervalo);

    
    // Cridem la vaiable que volem realitzar la accio 
    // amb la addEventListener cridem la variable del ratoli  "wheel" crem una funcio i fiquem un true que ens agafa tota la funcio

    $imagen.addEventListener("wheel",wheelOnImage, true);
    $imagen.addEventListener("mousemove",showNameImg,true);


    // Iniciar
    renderizarImagen();
} 
