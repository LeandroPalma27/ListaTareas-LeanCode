
// Clase para la creacion de instancias de tareas pero de manera individual:
export class Tareas {

    // Constructor de la clase:
    constructor(tarea) {
        this.id = new Date().getTime(); // De esta manera podemos simular la obtencion de un id.
        this.tarea = tarea;
        this.completado = false;
        this.creado = new Date();
    }

    // Metodo que carga un render HTML para cada tarea creada:
    render() {
        return `
        <div class="tarea">
                <span class="tarea-check"><i class="fas fa-check-circle"></i></span>
                <p class="tarea-content">${this.tarea}<span class="tarea-id">${this.id}</span></p>
                <span class="tarea-eliminar"><i class="fas fa-times"></i></span>
        </div>`;
    }

}