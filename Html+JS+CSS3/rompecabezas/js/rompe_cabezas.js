var dragSrcEl = null;

var movimientos = 0;

var estado = false;

var rompeCabezas = {
	_id: "none",
	contenedor: "",
	width: "300",
	height: "300",
	background: "red",
	pieze: 3,
	image: "",
	iniciar: function (id) {
		this._id = id;
		this.contenedor = document.getElementById(this._id);
		//Mezclar Fichas
		this.mezclarJuego();
		return true;
	},
	mezclarJuego: function() {
		//alert(parseInt(Math.random()*10));
		var contador = 0;
		//el 9 debe ser reemplazado por el número de piezas del juego
		while(contador < 9){
			var piezaInicio = parseInt(Math.random()*10);
			var piezaFin = parseInt(Math.random()*10);
			//si el número es menor que 0 y mayor que 9 no se lo toma en cuenta
			if((piezaInicio > 0 && piezaInicio < 10) && (piezaFin > 0 && piezaFin < 10) && (piezaInicio != piezaFin)){
				var piezaO = document.querySelectorAll('#cntRompecabeza .posicion'+piezaInicio)[0];
				piezaO = piezaO.getElementsByTagName("img")[0];
				p1 = piezaO.className.replace("gradiente ", "");
				var piezaD = document.querySelectorAll('#cntRompecabeza .posicion'+piezaFin)[0];
				piezaD = piezaD.getElementsByTagName("img")[0];
				p2 = piezaD.className.replace("gradiente ", "");
				piezaO.classList.remove(p1);
				piezaO.classList.add(p2);
				piezaD.classList.remove(p2);
				piezaD.classList.add(p1);
				
				//setTimeout(function(){}, 3000);

				contador++;
			}
		}
	}
};

function handleDragStart(e) {

	if(dragSrcEl != null){
		//console.log(dragSrcEl);
		//dragSrcEl.style.opacity = '1';
		var cols = document.querySelectorAll('#cntRompecabeza .gradiente');
		[].forEach.call(cols, function(col) {
			col.style.opacity = '1';
		});
	}

	// Target (this) element is the source node.
	this.style.opacity = '0.6';

	dragSrcEl = this;

	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', this.innerHTML);

}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
	validarEstado();
  return false;
}

function handleDragEnter(e) {
	// this / e.target is the current hover target.
	this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.
	if (e.stopPropagation) {
		e.stopPropagation(); // Stops some browsers from redirecting.
	}
	//alert(dragSrcEl.innerHTML);
  // Don't do anything if dropping the same column we're dragging.
  	if (dragSrcEl != this) {
	    // Set the source column's HTML to the HTML of the columnwe dropped on.
	    //alert(JSON.stringify(dragSrcEl));
	    var destino = this.className;
	    var origen = dragSrcEl.className;
	    this.className = origen;
	    this.style.opacity = '0.6';
	    dragSrcEl.className = destino;
		dragSrcEl.classList.remove("over");
		dragSrcEl.style.opacity = '1';
		movimientos++;
		document.getElementById("totalMovimientos").innerHTML = "Movimientos: " + movimientos;
  	}
	return false;
}

//Soltar Pieza
function handleDragEnd(e) {
	validarEstado();
	if(estado){
		//Bloquear movimiento de fichas
		setTimeout(function(){
			//console.log(dragSrcEl);
			[].forEach.call(cols, function(col) {
				col.style.opacity = '1';
			});
			alert("Ganaste");
		}, 200);
	}
}

var cols = document.querySelectorAll('#cntRompecabeza .gradiente');
[].forEach.call(cols, function(col) {
	col.addEventListener('dragstart', handleDragStart, false);
	col.addEventListener('dragenter', handleDragEnter, false)
	col.addEventListener('dragover', handleDragOver, false);
	col.addEventListener('dragleave', handleDragLeave, false);
	col.addEventListener('drop', handleDrop, false);
	col.addEventListener('dragend', handleDragEnd, false);
});

function validarEstado(){
	var contador = 1;
	estado = true;
	[].forEach.call(cols, function(col) {
		if(!col.classList.contains("pieza"+contador)){
			estado = false;
		}
		contador++;
	});
	return estado;
}