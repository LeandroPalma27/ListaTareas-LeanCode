import { ListaTarea } from '../classes/tarea/tarea-lista.class';

//Creacion de las instancia de la lista de tareas:
const todoList = new ListaTarea(); 

// Procedimientos de guardar, borrar y terminar tareas en el localStorage:
export const saveLocalStorage = (tarea) => {
    todoList.nuevaTarea(tarea);
}
export const deleteLocalStorage = ( id ) => {
    todoList.eliminarTarea(id);
}
export const terminarTarea = ( id ) => {
    todoList.cambiarEstadoTarea(id);
}