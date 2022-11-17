let carrito = JSON.parse(localStorage.getItem("materia")) || [];
let contenedor = document.getElementById("misMaterias");
let totalMaterias = localStorage.getItem("total");
let botonFinalizar = document.getElementById("finalizar");
const apellido = document.getElementById("apellido");
const btnEnviar = document.getElementById("btn-enviar");
const resultado = document.getElementById("resultado");

(carrito != 0) && mostrarCarrito();

//El famoso Carrito Abandonado
function mostrarCarrito() {
    for (const materia of carrito) {
        document.getElementById("tablabody").innerHTML += `
            <tbody>
                <tr>
                    <td>${materia.codigo}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${materia.imagen}" alt="" style="width: 45px; height: 45px"/>
                            <div class="ms-4">
                                <p class="fw-bold mb-1">${materia.nombre}</p>
                                
                            </div>
                        </div>
                    </td>
                    <td>
                    <p class="text-muted mb-0">${materia.profesor}</p>
                    </td>
                    <td>
                        <button class="btn btn-light" onclick="eliminar(event)">X</button>
                    </td>
                </tr>
            </tbody>
        `;
    }
    apellido.value = localStorage.getItem("registro")
    let total = document.getElementById("total");
    total.innerText = "Cantidad de Materias Anotadas: " + totalMaterias;
}

//Generando un nuevo usuario
let registro;
btnEnviar.onclick = () => {
        if (apellido.value != "") {
            resultado.innerText = "Nombre Registrado";
            localStorage.setItem("registro", apellido.value);
        } else {
            resultado.innerText = "Ingresar Nombre y Apellido"
        }     
}

//Renderizar Materias
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

//Selección de materias
function materiaSeleccionada(materiaAgregada){
    if (carrito.length < 4 && !carrito.includes(materiaAgregada) && apellido.value != "") {
        console.log(materiaAgregada.alumnos)
        materiaAgregada.alumnos.push(apellido.value);
        carrito.push(materiaAgregada);
        localStorage.setItem("materia", JSON.stringify(carrito));
        carritoVacio.innerText = "";
        Swal.fire({
            title: materiaAgregada.nombre,
            text: 'Materia Seleccionada',
            imageUrl: materiaAgregada.imagen,
            imageWidth: 200,
            imageHeight: 200,
            showConfirmButton: false,
            timer: 1500
        })
        document.getElementById("tablabody").innerHTML += `
            <tbody>
                <tr>
                    <td>${materiaAgregada.codigo}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${materiaAgregada.imagen}" alt="" style="width: 45px; height: 45px"/>
                            <div class="ms-4">
                                <p class="fw-bold mb-1">${materiaAgregada.nombre}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                    <p class="text-muted mb-0">${materiaAgregada.profesor}</p>
                    </td>
                    <td>
                        <button class="btn btn-light" onclick="eliminar(event)">X</button>
                    </td>
                </tr>
            </tbody>
        `;
        totalMaterias++;
        localStorage.setItem("total", totalMaterias);
        let total = document.getElementById("total");
        let infoAlumnos = document.getElementById("info-alumnos");
        total.innerText = "Cantidad de Materias Anotadas: " + totalMaterias;
        infoAlumnos.innerText = materiaAgregada.nombre + ": " + materiaAgregada.alumnos.join(" - ");
    } else if (apellido.value == "") {
        Swal.fire({
            title: 'Debes registrarte',
            text: "Ingresa tu nombre y apellido",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'entendido'
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Cupo lleno',
            text: 'No puede anotarse en la materia',
        })
    }
    localStorage.getItem("materia")
}

//Para eliminar materias del carro
function eliminar(ev){
    for (const nombre of carrito) {
        nombre.alumnos.pop()
    }
    let fila = ev.target.parentElement.parentElement;
    let codigo = fila.children[0].innerText;
    let indice = carrito.findIndex(producto => producto.cod == codigo);
    console.log(indice)
    //remueve el producto del carro
    carrito.splice(indice,1);
    //remueve la fila de la tabla
    fila.remove();
    //storage
    localStorage.setItem("materia",JSON.stringify(carrito));
    totalMaterias--;
    let total = document.getElementById("total");
    let infoAlumnos = document.getElementById("info-alumnos");
    total.innerText = "Cantidad de Materias Anotadas: " + totalMaterias;
    infoAlumnos.innerText = "";
}

//Asincronía
function listadoHechizos(){
    const URLHECHIZOS="hechizos.json";
    fetch(URLHECHIZOS)
        .then(respuesta => respuesta.json())
        .then(hechizo => {
            for (const info of hechizo) {
                const listaDeHechizos = info.hechizo;
                const listaAcciones = info.uso;
                console.log(listaDeHechizos);
                document.getElementById("informacion-hechizos").innerHTML+=`
                    <div class="card card-hechizos">
                        <div class="card-header bg-primary">${listaDeHechizos}</div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">${listaAcciones}</li>
                            </ul>
                    </div>
                `;  
            }
        })
}
const btnInfo = document.getElementById("btn-info");
modoInfo = false;
btnInfo.onclick = () => {
    if (modoInfo == false) {
        listadoHechizos()
        modoInfo = true;
    }
    else {
        document.getElementById("informacion-hechizos").innerHTML=``
        modoInfo = false;
    }
}

//Dark Mode y Light Mode
let btnModo = document.getElementById("btn-modo");
let textoModo = document.getElementById("texto-modo");
let modoDefecto = localStorage.getItem("modo");
//Renderizado Storage Dark Mode y Light Mode
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

//Boton Finalizar
let carritoVacio = document.getElementById("carrito-vacio");
let infoCantidad = document.getElementById("info-cantidad");
let infoAlumnos = document.getElementById("info-alumnos");
let contador = 0;
botonFinalizar.onclick = () => {
    if (carrito != "") {
        carrito = [];
        document.getElementById("tablabody").innerHTML="";
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: 'Solicitud Enviada'
        })
        totalMaterias = 0;
        localStorage.removeItem("total");
        localStorage.removeItem("materia");
        let total = document.getElementById("total");
        let infoAlumnos = document.getElementById("info-alumnos");
        total.innerText = "Cantidad de Materias Anotadas: " + totalMaterias;
        infoAlumnos.innerText = "";
        localStorage.removeItem("registro");
        apellido.value = "";
    } else {
        carritoVacio.innerText = "Debe seleccionar una materia."
    }
}





