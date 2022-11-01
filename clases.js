class Personaje {
    constructor(nombre) {
        this.nombre = nombre.toUpperCase()
    }
}
class Materia {
    constructor(codigo, nombre, imagen, profesor, alumnos) {
        this.codigo = codigo, 
        this.nombre = nombre,
        this.imagen = imagen,
        this.profesor = profesor,
        this.alumnos = alumnos
    }
    agregarAlumno(alumno) {
        this.alumnos.push(alumno);
    }
    cantMaterias(alumno) {
        for (const ingresado of this.alumnos) {
            if (ingresado.includes(alumno)) {
                this.cantidad++;
            }
        }
    }
}