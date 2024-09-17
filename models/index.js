// Importamos los modelos
const Curso = require('./Curso');
const Estudiante = require('./Estudiante'); // Asegúrate de que el nombre del archivo sea correcto (Estudiante.js)

// Exportamos los modelos para que puedan ser usados en otras partes del proyecto
module.exports = {
    Curso,
    Estudiante
};