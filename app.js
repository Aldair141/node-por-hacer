const { argv } = require('./config/yargs');
const { crear, listar, actualizar, borrar } = require('./por-hacer/por-hacer');
const colors = require("colors");

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        console.log(argv.completado);
        let listado = listar(argv.completado);
        console.log(colors.green("============ POR HACER ============\n"));
        for (let tarea of listado) {
            console.log(`TAREA: ${ tarea.descripcion }`.green);
            console.log(`COMPLETADO: ${ tarea.completado == true ? "Si" : "No" }\n`.green);
        }
        console.log(colors.green("==================================="));
        break;
    case 'actualizar':
        let resultado = actualizar(argv.descripcion, argv.completado);
        if (resultado) {
            console.log(colors.green(`Se modificó la tarea: ${ argv.descripcion }.`));
        } else {
            console.log(colors.red(`La tarea ${ argv.descripcion } no se pudo modificar.`));
        }
        break;
    case 'borrar':
        let res = borrar(argv.descripcion);
        if (res) {
            console.log(colors.green(`Se borró la tarea: ${ argv.descripcion }.`));
        } else {
            console.log(colors.red(`La tarea ${ argv.descripcion } no se pudo borrar.`));
        }
        break;
    default:
        console.log('Comando no reconocido');
        break;
}