const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstudianteCurso = sequelize.define('EstudianteCurso', {
    // Aquí puedes definir atributos adicionales si los necesitas
});

module.exports = EstudianteCurso;
