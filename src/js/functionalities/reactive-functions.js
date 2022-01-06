
/* export const checkTareas = () => {
    const contentLocalStorageString = window.localStorage.getItem('tareas');
    const contentLocalStorage = JSON.parse(contentLocalStorageString);
    const tareasEnTrue = [];
    const tareasPorId = document.querySelectorAll('.tarea-id');
    for (let contenido of contentLocalStorage) {
        if (contenido.completado == true) {
            tareasEnTrue.push(contenido.id);
        }
    }
    for (let i = 0; i < tareasPorId.length; i++) {
        for (let j = 0; j < tareasEnTrue.length; j++) {
            if (tareasPorId[i].innerHTML == tareasEnTrue[j]) {
                tareasPorId[i].parentElement.previousElementSibling.classList.toggle('active');
            }
        }
    }
} */

// Funcion para obtener las tareas pendientes y retornar un contador de esas tareas:
export const obtenerTareasPendientes = () => {
    const contentLocalStorageString = window.localStorage.getItem('tareas');
    if (!!contentLocalStorageString) {
        const contentLocalStorage = JSON.parse(contentLocalStorageString);
        const cantidadPendientes = contentLocalStorage.filter((data) => {
            if (data.completado == false) return data;
        });
        return cantidadPendientes.length;
    } else {
        return 0;
    }
}