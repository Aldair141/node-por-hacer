const fs = require('fs');
const { boolean } = require('yargs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile("./database/data.json", data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar.');
        }
    })
}

const cargarDB = () => {
    try {
        listadoPorHacer = require("../database/data.json");
    } catch (err) {
        listadoPorHacer = [];
    }
}

const crear = descripcion => {
    cargarDB();

    let porHacer = {
        descripcion: descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const listar = (completado) => {
    cargarDB();

    if (completado === null) {
        return listadoPorHacer;
    } else {
        return listadoPorHacer.filter((tarea) => {
            return tarea.completado.toString() === completado;
        });
    }
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    // let index = listadoPorHacer.findIndex(tarea => {
    //     return tarea.descripcion === descripcion;
    // });

    // if (index >= 0) {
    //     listadoPorHacer.splice(index, 1);
    //     guardarDB();
    //     return true;
    // } else {
    //     return false;
    // }

    //Otra forma
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
}