let nombreGastos = [];
let valorGastos = [];
let descripciones = [];

function add() {
    let nombre = document.getElementById('nombreGasto').value;
    let gasto = document.getElementById('valorGasto').value;
    let descripcion = document.getElementById('descripcionGasto').value;
    nombreGastos.push(nombre);
    valorGastos.push(gasto);
    descripciones.push(descripcion);
    actualizarListado();
}

function actualizarListado() {
    const listado = document.getElementById('listaDeGastos');
    const totalGasto = document.getElementById('totalGastos');
    let cadena = '';
    let total = 0;
    nombreGastos.forEach((element, position) => {
        const gasto = valorGastos[position];
        const descripcion = descripciones[position];
        cadena += `<li id="gasto-${position}">${element} - ${descripcion} - US $${gasto}
                    <button onclick="editar(${position});">Editar</button>
                    <button onclick="eliminar(${position});">Eliminar</button>            
                    <div id="editar-${position}"></div>
                    </li>`;
        total += Number(gasto);
    });
    totalGasto.innerHTML = total.toFixed(2);
    listado.innerHTML = cadena;
    limpiar();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
}

function eliminar(position) {
    nombreGastos.splice(position, 1);
    valorGastos.splice(position, 1);
    descripciones.splice(position, 1);
    actualizarListado();
}

function editar(position) {
    const cuadroEdicion = document.getElementById(`editar-${position}`);
    cuadroEdicion.innerHTML = `
        <input type="text" id="editarNombreGasto-${position}" value="${nombreGastos[position]}" placeholder="Nuevo nombre">
        <input type="text" id="editarDescripcionGasto-${position}" value="${descripciones[position]}" placeholder="Nueva descripción">
        <input type="number" id="editarValorGasto-${position}" value="${valorGastos[position]}" placeholder="Nuevo valor" min="0" step="0.01">
        <button onclick="guardarEdicion(${position});">Guardar</button>
        <button onclick="cancelarEdicion(${position});">Cancelar</button>`;

    window.formEditarActual = cuadroEdicion;
}

function guardarEdicion(position) {
    const nuevoNombre = document.getElementById(`editarNombreGasto-${position}`).value;
    const nuevaDescripcion = document.getElementById(`editarDescripcionGasto-${position}`).value;
    const nuevoValor = document.getElementById(`editarValorGasto-${position}`).value;
    nombreGastos[position] = nuevoNombre;
    descripciones[position] = nuevaDescripcion;
    valorGastos[position] = nuevoValor;
    actualizarListado();
}

function cancelarEdicion(position) {
    const cuadroEdicion = document.getElementById(`editar-${position}`);
    cuadroEdicion.innerHTML = '';
}
