// CONTADOR
const contador = document.getElementById("contador");
const aumentar = document.getElementById("aumentar");
const disminuir = document.getElementById("disminuir");
const resetear = document.getElementById("resetear");

let numero = 0;
  const numeroInput = document.addEventListener("keydown", (event)=>{
        numero = event.key;
        if(numero > 0){
            btnComenzar.disabled = true;
        } else{
            btnComenzar.disabled = false;
        }
      
})
contador.addEventListener("keydown", (event)=>{
	numero = event.key;
	if(numero > 0){
		btnComenzar.disabled = true;
	} else{
		btnComenzar.disabled = false;
	}
  
})
aumentar.addEventListener("click", ()=>{
        numero ++;
        contador.value = numero;
		
       
})
disminuir.addEventListener("click", ()=>{
    numero--;
    contador.value = numero;
})

resetear.addEventListener("click", ()=>{
    numero = 0;
    contador.value = numero;
})

//  CRONOMETRO

    const tiempoRecorrido = document.querySelector("#tiempoRecorrido");
	const btnComenzar = document.querySelector("#btnComenzar");
	const btnParar = document.querySelector("#btnParar");
	let btnMarcarVuelta = document.querySelector("#btnMarcarVuelta");
	const containerMarcarVueltas = document.querySelector("#containerMarcarVueltas");
    const btnDelete = document.querySelector("#btnDelete");

	let marcas = [],
		idInterval,
		tiempoInicio = null;
		let bandera = false;
	let diferenciaTemporal = 0;
	const ocultarElemento = elemento => {
		elemento.style.display = "none";
	}

	const mostrarElemento = elemento => {
		elemento.style.display = "";
	}

	const rellenarConCeros = valor => {
		if (valor < 10) {
			return "0" + valor;
		} else {
			return "" + valor;
		}
	}

	const miliSegMinYSeg = (milisegundos) => {
		const minutos = parseInt(milisegundos / 1000 / 60);
		milisegundos -= minutos * 60 * 1000;
		segundos = (milisegundos / 1000);
		return `${rellenarConCeros(minutos)}:${rellenarConCeros(segundos.toFixed(1))}`;
	};

	const iniciar = () => {
		const ahora = new Date();
		tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal);
		clearInterval(idInterval);
		idInterval = setInterval(refrescarTiempo, 100);
		ocultarElemento(btnComenzar);
        mostrarElemento(btnDelete);
		mostrarElemento(btnMarcarVuelta);
		mostrarElemento(btnParar);
	};
	const pausar = () => {
		let bandera = true;
		diferenciaTemporal = new Date() - tiempoInicio.getTime();
		clearInterval(idInterval);
		mostrarElemento(btnComenzar);
		ocultarElemento(btnMarcarVuelta);
		ocultarElemento(btnParar);
	};
	const refrescarTiempo = () => {
		const ahora = new Date();
		const diferencia = ahora.getTime() - tiempoInicio.getTime();
		tiempoRecorrido.textContent = miliSegMinYSeg(diferencia);
	};
	const ponerMarca = () => {
		marcas.unshift(new Date() - tiempoInicio.getTime());
		dibujarMarcas();
	};
 
    let diferenciaTiempo =[]
  
	const dibujarMarcas = () => {
		containerMarcarVueltas.innerHTML = "";
        mostrarElemento(btnDelete);

		for (const [indice, marca] of marcas.entries()) {
            const ahora = new Date();
            const diferencia = ahora.getTime() - tiempoInicio.getTime();
            tiempoRecorrido.textContent = miliSegMinYSeg(diferencia);
            let ultimoArray = diferenciaTiempo.push(miliSegMinYSeg(diferencia));

			const $p = document.createElement("p");
			$p.innerHTML = `${marcas.length - indice}. ${miliSegMinYSeg(marca)} <span class="spanEdit" contenteditable = true >Nombre:</span></br>
            
            <span>Diferencia: </span>  ${(diferenciaTiempo[diferenciaTiempo.length-1] - ultimoArray ).toFixed(2)}` 
			containerMarcarVueltas.append($p);
		}
	};


    const borrarTodo = () => {
        while(containerMarcarVueltas.firstChild){
			containerMarcarVueltas.removeChild(containerMarcarVueltas.firstChild)
		}
    }
	const init = () => {
		ocultarElemento(btnParar);
		ocultarElemento(btnMarcarVuelta);
	};
	init();

	btnComenzar.onclick = iniciar;
	btnMarcarVuelta.onclick = ponerMarca;
	btnParar.onclick = pausar;
    btnDelete.onclick = borrarTodo;

// TEMPORIZADOR

document.addEventListener("DOMContentLoaded", () => {
	const tiempoFaltante = document.querySelector("#tiempoEnPantalla"),
		btnArracar = document.querySelector("#btnIniciarTemporizador"),
		$btnPausar = document.querySelector("#btnPausarTemporizador"),
		minutosTemp = document.querySelector("#minutosTemporizador"),
		segTemp = document.querySelector("#segundosTemporizador"),
		containerInputs = document.querySelector("#containerInputs");
	let idInterval = null, diferenciaTemporal = 0,
		fechaFuturo = null;

if( iniciar.onclick){
	btnArracar.disabled = true;
	btnArracar.classList.add('deshabilitar');
}else{
	btnArracar.disabled = false;
}

	const iniciarTemporizador = (minutosTemporizador, segundosTemporizador) => {
		document.body.style.backgroundColor = 'black';

		ocultarElemento(containerInputs);
		mostrarElemento($btnPausar);
		ocultarElemento(btnArracar);


		if (fechaFuturo) {
			fechaFuturo = new Date(new Date().getTime() + diferenciaTemporal);
			diferenciaTemporal = 0;
			
		} else {
			const milisegundos = (segundosTemporizador + (minutosTemporizador * 60)) * 1000;
			fechaFuturo = new Date(new Date().getTime() + milisegundos);
		}
		clearInterval(idInterval);
		idInterval = setInterval(() => {
			const tiempoRestante = fechaFuturo.getTime() - new Date().getTime();
			if (tiempoRestante <= 0) {
				clearInterval(idInterval);
				ocultarElemento($btnPausar);
				mostrarElemento(btnArracar);
                const tempOk= document.getElementById("btnIniciarTemporizador").innerHTML = "Temporizador OK";
	            document.body.style.backgroundColor = 'rgba(255,0,0,0.7)';
			    
			} else {
				tiempoFaltante.textContent = miliSegMinYSeg(tiempoRestante);

			}

		}, 50);
		
	};

	const pausarTemporizador = () => {
		ocultarElemento($btnPausar);
		mostrarElemento(btnArracar);
		diferenciaTemporal = fechaFuturo.getTime() - new Date().getTime();
		clearInterval(idInterval);
	};

	const detenerTemporizador = () => {
		clearInterval(idInterval);
		fechaFuturo = null;
		diferenciaTemporal = 0;
		tiempoFaltante.textContent = "00:00.0";
		init();
	};

	const init = () => {
		minutosTemp.value = "";
		segTemp.value = "";
		mostrarElemento(containerInputs);
		mostrarElemento(btnArracar);
		ocultarElemento($btnPausar);
	
	};

	btnArracar.onclick = () => {
		const minutosTemporizador = parseInt(minutosTemp.value);
		const segundosTemporizador = parseInt(segTemp.value);
		if (isNaN(minutosTemporizador) || isNaN(segundosTemporizador) || (segundosTemporizador <= 0 && minutosTemporizador <= 0)) {
			return;
		}
		iniciarTemporizador(minutosTemporizador, segundosTemporizador);
	};
	init();
	$btnPausar.onclick = pausarTemporizador;
});