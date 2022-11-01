let carrito = []
let contenedor = document.getElementById("misMaterias");
let totalCarrito;
let botonFinalizar = document.getElementById("finalizar");

//Generando un nuevo usuario
const apellido = document.getElementById("apellido");
const btnEnviar = document.getElementById("btn-enviar");
const resultado = document.getElementById("resultado");
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
function materiaSeleccionada(materiaAgregada){
    if (carrito.length < 4 && !carrito.includes(materiaAgregada)) {
        carrito.push(materiaAgregada);
        localStorage.setItem("materia", JSON.stringify(carrito));
        carritoVacio.innerText = "";
        // materiaAgregada.alumnos.push(localStorage.getItem("registro"))
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
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Cupo lleno',
            text: 'No puede anotarse en la materia',
        })
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
    } else {
        carritoVacio.innerText = "Debe seleccionar una materia."
    }
}

//Sector Información
//EN CONSTRUCCIÓN
// const btnInfo = document.getElementById("btn-info");
// const ingreso = document.getElementById("ingreso");
// btnInfo.onclick = () => {
//     let recuperarStorage = JSON.parse(localStorage.getItem("materia"));
//     let recuperarAlumnoStorage = localStorage.getItem("registro");
//     let elementos = document.getElementById("elementos");
//     elementos.innerText = "El alumno" + recuperarAlumnoStorage;
//     for (const element of recuperarStorage) {
//         let informacionTotal = document.getElementById("informacion-total");
//         console.log(element.profesor)
//         informacionTotal.innerText += "El profesor es:";
//     }
// }




