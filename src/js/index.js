import '@fortawesome/fontawesome-free/js/all';
import '../css/index.css';

import { Tareas } from './classes/tarea/tarea.class';
import { ListaTarea } from './classes/tarea/tarea-lista.class';
import { saveLocalStorage, deleteLocalStorage, terminarTarea } from './functionalities/procedimientos-localStorage';
import { obtenerTareasPendientes } from './functionalities/reactive-functions';

// Botones para el filtrado de tareas:
const btnGeneral = document.getElementById('btnGeneral');
const btnCompletados = document.getElementById('btnCompletados');
const btnPendientes = document.getElementById('btnPendientes');
const btnBorrarTerminados = document.getElementById('btnBorrarTerminados'); 

// Objeto de la lista de tareas:
const listaTareas = new ListaTarea();

// Input para el ingreso de las tareas:
const inputTareas = document.getElementById('txtTareas');

// Caja contenedora de las tareas:
const cajaTareas = document.querySelector('.background-tareas');

// Para cargar datos previos en caso de que existan en el localStorage:
if (!!window.localStorage.getItem('tareas')) {
    const renderizado = listaTareas.renderizarTareas();
    cajaTareas.innerHTML = renderizado;
}

// Para obtener el estado de tareas pendientes:
let tareasPendientes = obtenerTareasPendientes();
/* Tambien es necesario obtener la caja donde mostraremos la cantidad de pendientes */
const cajaPendientes = document.querySelector('.pendientes');

// Boton para eliminar alguna tarea cualquiera (necesario que antes esten renderizados los elementos existentes en el localStorage):
let btnDeleteOne = document.querySelectorAll('.tarea-eliminar');
// Boton para cambiar estado de pendiente a terminado:
let btnTerminado = document.querySelectorAll('.tarea-check');

/* Eventos */
// Evento para ingresar una tarea con enter:
inputTareas.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        if ( inputTareas.value.length < 57 ) {
            const tarea = new Tareas(inputTareas.value);
            let contenidoCaja = cajaTareas.innerHTML;
            contenidoCaja += tarea.render();
            cajaTareas.innerHTML = contenidoCaja;
            inputTareas.value = '';
            saveLocalStorage(tarea);
            tareasPendientes = obtenerTareasPendientes();
            cajaPendientes.innerHTML = tareasPendientes;
            // Lo de arriba sirve para generar un render de una tarea nueva y tambien guarda la tarea en localStorage.
            recargaElementos();
        }
        else alert('La tarea no debe exceder 56 caracteres.');
    }
});

// Evento para cada boton que elimina tarea:
btnDeleteOne.forEach((e) => {
    e.addEventListener('click', () => {
        const id = (e.previousElementSibling.firstElementChild).innerText;
        deleteLocalStorage(id);
        tareasPendientes = obtenerTareasPendientes();
        cajaPendientes.innerHTML = tareasPendientes;
    });
});

btnTerminado.forEach((e) => {
    e.addEventListener('click', () => {
        e.classList.toggle('active');
        const id = (e.nextElementSibling.lastElementChild).innerText;
        terminarTarea(id);
        tareasPendientes = obtenerTareasPendientes();
        cajaPendientes.innerHTML = tareasPendientes;
    });
});

const recargaElementos = () => {
    const nuevosIngresosParaEliminar = document.querySelectorAll('.tarea-eliminar');
            btnDeleteOne = nuevosIngresosParaEliminar;
            btnDeleteOne.forEach((e) => {
                e.addEventListener('click', () => {
                    const id = (e.previousElementSibling.firstElementChild).innerText;
                    deleteLocalStorage(id);
                    tareasPendientes = obtenerTareasPendientes();
                    cajaPendientes.innerHTML = tareasPendientes;
                });
            });
            const nuevosIngresosParaTerminar = document.querySelectorAll('.tarea-check');
            btnTerminado = nuevosIngresosParaTerminar;
            btnTerminado.forEach((e) => {
                e.addEventListener('click', () => {
                    e.classList.toggle('active');
                    const id = (e.nextElementSibling.lastElementChild).innerText;
                    terminarTarea(id);
                    tareasPendientes = obtenerTareasPendientes();
                    cajaPendientes.innerHTML = tareasPendientes;
                });
            });
            // Esto sirve para que cuando se añadan nuevos renders, los eventos disparados por cada boton se actualicen, ya que se añadieron nuevos a la lista de elementos que habia al inicio.
}

// Eventos para el filtrado de tareas:
btnGeneral.addEventListener('click', () => {
    if (!!window.localStorage.getItem('tareas')) {
        cajaTareas.innerHTML = listaTareas.renderizarTareas();
        recargaElementos();
    }
});
btnCompletados.addEventListener('click', () => {
    if (!!window.localStorage.getItem('tareas')) {
        cajaTareas.innerHTML = listaTareas.renderizarTareasCompletadas();
        recargaElementos();
    }
});
btnPendientes.addEventListener('click', () => {
    if (!!window.localStorage.getItem('tareas')) {
        cajaTareas.innerHTML = listaTareas.renderizarTareasPendientes();
        recargaElementos();
    }
});
btnBorrarTerminados.addEventListener('click', () => {
    if (!!window.localStorage.getItem('tareas')) {
        listaTareas.eliminarTareasCompletadas();
        cajaTareas.innerHTML = listaTareas.renderizarTareasPendientes();
        recargaElementos();
    }
});

// Para cargar los pendientes al momento de cargar o recargar la aplicacion:
cajaPendientes.innerHTML = tareasPendientes;








