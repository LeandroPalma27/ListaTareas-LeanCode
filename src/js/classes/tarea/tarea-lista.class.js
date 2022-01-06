
export class ListaTarea {

    // Contructor de una lista de tareas, a la cual se le ingresaran objetos unicos de tipo tarea.
    constructor() {
        this.listaTarea = [];
    }

    // Metodo para crear una nueva tarea:
    nuevaTarea(tarea) {
        this.listaTarea.push(tarea);
        const contentLocalStorageString = window.localStorage.getItem('tareas');
        if (contentLocalStorageString == null) {
            window.localStorage.setItem('tareas', JSON.stringify([tarea]));
        }
        else {
            const contentLocalStorage = JSON.parse(contentLocalStorageString);
            contentLocalStorage.push({ ...tarea });
            window.localStorage.setItem('tareas', JSON.stringify(contentLocalStorage));
        }
    }

    // Metodo para cambiar el estado de una tarea:
    cambiarEstadoTarea(id) {
        const contentLocalStorageString = window.localStorage.getItem('tareas');
        const contentLocalStorage = JSON.parse(contentLocalStorageString);
        for (let contenido of contentLocalStorage) {
            if (contenido.id == id) {
                if (contenido.completado == true) {
                    contenido.completado = false;
                } else if (contenido.completado == false) {
                    contenido.completado = true;
                }
                break;
            }
        }
        window.localStorage.setItem('tareas', JSON.stringify(contentLocalStorage));
    }

    // Metodo para eliminar tareas completadas:
    eliminarTareasCompletadas() {
        const tareasExistentes = JSON.parse(window.localStorage.getItem('tareas'));
        const tareasNoCompletadas = tareasExistentes.filter((object) => {
            if (object.completado == false) return object;
        });
        window.localStorage.setItem('tareas', JSON.stringify(tareasNoCompletadas));
    }

    // Metodo para eliminar una tarea en especifico:
    eliminarTarea(id) {
        this.listaTarea = this.listaTarea.filter((tarea) => {
            tarea.id != id;
        });
        let tareasExistentes = JSON.parse(window.localStorage.getItem('tareas'));
        const nuevasTareasExistentes = tareasExistentes.filter(tarea => tarea.id != id);
        window.localStorage.setItem('tareas', JSON.stringify(nuevasTareasExistentes));
        this.eliminarRender(id);
    }

    // Metodo para renderizar todas las tareas existentes en el localStorage:
    renderizarTareas() {
        const tareasExistentes = JSON.parse(window.localStorage.getItem('tareas'));
        const renderizado = tareasExistentes.map((object) => {
            if (object.completado == true) {
                return `
                <div class="tarea">
                    <span class="tarea-check active"><i class="fas fa-check-circle"></i></span>
                    <p class="tarea-content">${object.tarea}<span class="tarea-id">${object.id}</span></p>
                    <span class="tarea-eliminar"><i class="fas fa-times"></i></span>
                </div>`;
            } else if (object.completado == false) {
                return `
                <div class="tarea">
                    <span class="tarea-check"><i class="fas fa-check-circle"></i></span>
                    <p class="tarea-content">${object.tarea}<span class="tarea-id">${object.id}</span></p>
                    <span class="tarea-eliminar"><i class="fas fa-times"></i></span>
                </div>`;
            }
        });
        return renderizado.join(' ');
    }

    // Metodo para renderizar solo tareas completadas:
    renderizarTareasCompletadas() {
        const tareasExistentes = JSON.parse(window.localStorage.getItem('tareas'));
        const tareasTerminadas = tareasExistentes.filter((object) =>{
            if (object.completado == true) return object;
        });
        const renderizado = tareasTerminadas.map((object) => {
            return `<div class="tarea">
                        <span class="tarea-check active"><i class="fas fa-check-circle"></i></span>
                        <p class="tarea-content">${object.tarea}<span class="tarea-id">${object.id}</span></p>
                        <span class="tarea-eliminar"><i class="fas fa-times"></i></span>
                    </div>`;
        });
        return renderizado.join(' ');
    }

    // Metodo para renderizar solo tareas pendientes:
    renderizarTareasPendientes() {
        const tareasExistentes = JSON.parse(window.localStorage.getItem('tareas'));
        const tareasTerminadas = tareasExistentes.filter((object) =>{
            if (object.completado == false) return object;
        });
        const renderizado = tareasTerminadas.map((object) => {
            return `<div class="tarea">
                        <span class="tarea-check"><i class="fas fa-check-circle"></i></span>
                        <p class="tarea-content">${object.tarea}<span class="tarea-id">${object.id}</span></p>
                        <span class="tarea-eliminar"><i class="fas fa-times"></i></span>
                    </div>`;
        });
        return renderizado.join(' ');
    }

    // Metodo para eliminar un render (se llama cuando se elimina una tarea en especifico):
    eliminarRender(id) {
        const elementos = document.querySelectorAll('.tarea-id');
        for (let elemento of elementos) {
            if (elemento.innerHTML == id) {
                const cajaTareas = document.querySelector('.background-tareas')
                cajaTareas.removeChild(elemento.parentElement.parentElement);
                break;
            }
        }
    }

}