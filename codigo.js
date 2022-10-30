const carrito = []
let contenedor = document.getElementById("misMaterias");
let renderizarMaterias = () => {
    for (const materia of materias) {
        contenedor.innerHTML += `
        <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm border-primary">
                <div class="card-header py-3 border-primary text-light bg-primary">
                    <h4 class="my-0 fw-normal">${materia.nombre}</h4>
                </div>
                <div class="card-body">
                    <img src=${materia.imagen} class="mb-2">
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>Código: ${materia.codigo}</li>
                        <li>Profesor: ${materia.profesor}</li>
                    </ul>
                    <button id="btn${materia.codigo}" type="button" class="w-100 btn btn-lg btn-outline-primary">Seleccionar Materia</button>
                </div>
            </div>
        </div>
        `;
    }
    //EVENTOS
    materias.forEach(materia => {
        //evento para cada boton
        document.getElementById(`btn${materia.codigo}`).addEventListener("click",function(){
            materiaSeleccionada(materia);
        });
        
    })
} 
renderizarMaterias();

function materiaSeleccionada(materiaAgregada){
    if (carrito.length < 4) {
        carrito.push(materiaAgregada);
        localStorage.setItem("materia", JSON.stringify(carrito));
        console.table(carrito);
        alert("Producto: "+ materiaAgregada.nombre +" agregado al carrito!");
        document.getElementById("tablabody").innerHTML += `
            <tbody>
                <tr>
                    <td>${materiaAgregada.codigo}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${materiaAgregada.imagen}" alt="" style="width: 45px; height: 45px"/>
                            <div class="ms-4">
                                <p class="fw-bold mb-1">${materiaAgregada.nombre}</p>
                                <p class="text-muted mb-0">${materiaAgregada.profesor}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p class="fw-normal mb-1">Software engineer</p>
                        <p class="text-muted mb-0">IT department</p>
                    </td>
                    <td>
                        <button type="button" class="btn btn-link btn-sm btn-rounded">Edit</button>
                    </td>
                </tr>
            </tbody>
        `;
        console.log(materiaAgregada.codigo)
        totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
        let infoTotal = document.getElementById("total");
        infoTotal.innerText="Total a pagar $: "+totalCarrito;
    } else {
        alert("No puede inscribirse en más materias")
    }
    
    // for (const materia of carrito) {
    //     almacenarMaterias(carrito.codigo, JSON.stringify(materia));
    // }
    // const carritoAJson = JSON.stringify(carrito);
    // localStorage.setItem("materia", carritoAJson);
}

//Guardado de materias elegidas en Storage

//Dark Mode y Light Mode
let btnModo = document.getElementById("btn-modo");
let textoModo = document.getElementById("texto-modo");
let modoDefecto = localStorage.getItem("modo");

//Renderizado Storage
if (modoDefecto != null) {
    document.body.className = modoDefecto;
    textoModo.className ="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center " + modoDefecto;
    if (modoDefecto == "light") {
        btnModo.innerText = "Dark Mode";
    } else {
        btnModo.innerText = "Light Mode";
    }
} else {
    modoDefecto = "light";
}
btnModo.onclick = () => {
    if (modoDefecto == "light") {
        document.body.className = "dark";
        textoModo.classList.remove("light");
        textoModo.classList.add("dark");
        btnModo.innerText = "Light Mode";
        modoDefecto = "dark";
    } else {
        document.body.className = "light";
        textoModo.classList.remove("dark");
        textoModo.classList.add("light");
        btnModo.innerText = "Dark Mode";
        modoDefecto = "light";
    }
    localStorage.setItem("modo", modoDefecto);
}

//Tomando Input Nombre
let inputNombre = document.getElementById("input-nombre");

//No repetir materias



