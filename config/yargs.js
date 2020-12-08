const _descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Descripción de la tarea por hacer.'
};

const _completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente una tarea.'
};

const { argv } = require('yargs').command("crear", "Crea una nueva tarea por hacer.", {
    descripcion: _descripcion
}).command("actualizar", "Actualiza el estado completado de una tarea.", {
    descripcion: _descripcion,
    completado: _completado
}).command('borrar', 'Borrar una tarea de la lista.', {
    descripcion: _descripcion
}).command('listar', 'Mostrar en pantalla la lista de tareas.', {
    completado: {
        alias: 'c',
        default: null
    }
}).help();

module.exports = {
    argv
}